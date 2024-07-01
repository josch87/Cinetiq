package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.auth.GithubMapper;
import com.aljoschazoeller.backend.auth.GithubService;
import com.aljoschazoeller.backend.exceptions.GithubProfileNotFoundException;
import com.aljoschazoeller.backend.exceptions.UserNotFoundException;
import com.aljoschazoeller.backend.user.domain.*;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

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
                true,
                AppUserStatus.ACTIVE,
                registeredAt
        );

        return userRepository.save(appUserToSave);
    }

    public AppUser syncGithubUserProfile(OAuth2User user) {
        Instant currentTime = Instant.now();

        AppUser appUser = this.findByGithubId(user.getAttributes().get("id").toString());
        GithubUserProfile oAuth2UserGithubProfile = GithubMapper.mapOAuth2UserToGithubUserProfile(user);

        updateGithubUserProfile(appUser, currentTime, oAuth2UserGithubProfile);
        return this.findByGithubId(appUser.githubId());
    }

    public GithubUserProfileSyncStatus syncGithubUserProfile(AppUser appUser) {
        Instant currentTime = Instant.now();

        Integer githubId = Integer.valueOf(appUser.githubId());
        try {
            GithubUserProfile userProfile = githubService.getUserProfile(githubId);
            return updateGithubUserProfile(appUser, currentTime, userProfile);

        } catch (GithubProfileNotFoundException exception) {
            AppUser appUserWithInactiveGithub = appUser.withGithubUserProfileActive(false);
            userRepository.save(appUserWithInactiveGithub);
            return GithubUserProfileSyncStatus.NOT_FOUND;
        }
    }

    private GithubUserProfileSyncStatus updateGithubUserProfile(AppUser appUser, Instant currentTime, GithubUserProfile currentGithubUserProfile) {
        AppUser updatedAppUser;
        boolean isGithubUpdatedSinceLastSync = currentGithubUserProfile.updated_at().isAfter(appUser.githubUserProfileSynced().updated_at());

        GithubUserProfileSyncStatus returnValue;

        if (isGithubUpdatedSinceLastSync) {
            updatedAppUser = appUser
                    .withGithubUserProfileSynced(currentGithubUserProfile)
                    .withGithubUserProfileSyncedAt(currentTime)
                    .withGithubUserProfileUpdatedAt(currentTime);
            returnValue = GithubUserProfileSyncStatus.UPDATED;
        } else {
            updatedAppUser = appUser
                    .withGithubUserProfileSyncedAt(currentTime);
            returnValue = GithubUserProfileSyncStatus.NOT_UPDATED;
        }
        userRepository.save(updatedAppUser);
        return returnValue;
    }

    public SyncedGithubProfilesDTO syncGithubUserProfiles() {
        List<AppUser> appUsers = this.getAllUsers();

        AtomicInteger updated = new AtomicInteger();
        AtomicInteger notUpdated = new AtomicInteger();
        AtomicInteger notFound = new AtomicInteger();

        appUsers.forEach(appUser -> {
            GithubUserProfileSyncStatus syncStatus = this.syncGithubUserProfile(appUser);
            switch (syncStatus) {
                case UPDATED -> updated.getAndIncrement();
                case NOT_UPDATED -> notUpdated.getAndIncrement();
                case NOT_FOUND -> notFound.getAndIncrement();
            }
        });

        return new SyncedGithubProfilesDTO(
                appUsers.size(),
                updated.get(),
                notUpdated.get(),
                notFound.get()
        );
    }
}
