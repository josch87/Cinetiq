package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.auth.GithubMapper;
import com.aljoschazoeller.backend.auth.GithubService;
import com.aljoschazoeller.backend.exceptions.UserNotFoundException;
import com.aljoschazoeller.backend.user.domain.AppUser;
import com.aljoschazoeller.backend.user.domain.GithubUserProfile;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final GithubService githubService;

    public UserService(UserRepository userRepository, GithubService githubService) {
        this.userRepository = userRepository;
        this.githubService = githubService;
    }

    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

    public AppUser findByGithubId(String githubId) {
        return userRepository.findAppUserByGithubId(githubId)
                .orElseThrow(() -> new UserNotFoundException("No appUser found with GitHub ID '" + githubId + "'"));
    }

    public AppUser register(OAuth2User oAuth2User, Instant registeredAt) {
        GithubUserProfile githubUserProfile = GithubMapper.mapOAuth2UserToGithubUserProfile(oAuth2User);

        AppUser appUserToSave = new AppUser(
                null,
                oAuth2User.getAttributes().get("id").toString(),
                oAuth2User.getAttributes(),
                githubUserProfile,
                registeredAt,
                null,
                registeredAt
        );

        return userRepository.save(appUserToSave);
    }

    public AppUser syncGithubUserProfile(OAuth2User user) {
        Instant currentTime = Instant.now();

        AppUser appUser = this.findByGithubId(user.getAttributes().get("id").toString());
        GithubUserProfile oAuth2UserGithubProfile = GithubMapper.mapOAuth2UserToGithubUserProfile(user);

        return updateGithubUserProfile(appUser, currentTime, oAuth2UserGithubProfile);
    }

    public AppUser syncGithubUserProfile(AppUser appUser) {
        Instant currentTime = Instant.now();

        Integer githubId = Integer.valueOf(appUser.githubId());
        Optional<GithubUserProfile> userProfile = githubService.getUserProfile(githubId);

        if (userProfile.isEmpty()) {
            return null;
        }

        return updateGithubUserProfile(appUser, currentTime, userProfile.get());
    }

    private AppUser updateGithubUserProfile(AppUser appUser, Instant currentTime, GithubUserProfile currentGithubUserProfile) {
        AppUser updatedAppUser;
        boolean isGithubUpdatedSinceLastSync = currentGithubUserProfile.updated_at().isAfter(appUser.githubUserProfileSynced().updated_at());


        if (isGithubUpdatedSinceLastSync) {
            updatedAppUser = appUser
                    .withGithubUserProfileSynced(currentGithubUserProfile)
                    .withGithubUserProfileSyncedAt(currentTime)
                    .withGithubUserProfileUpdatedAt(currentTime);
        } else {
            updatedAppUser = appUser
                    .withGithubUserProfileSyncedAt(currentTime);
        }
        return userRepository.save(updatedAppUser);
    }

    public String syncGithubUserProfiles() {
        List<AppUser> appUsers = this.getAllUsers();

        appUsers.forEach(this::syncGithubUserProfile);
        return "Found " + appUsers.size() + " user(s) to sync.";
    }
}
