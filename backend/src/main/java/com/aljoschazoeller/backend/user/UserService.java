package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.auth.GithubMapper;
import com.aljoschazoeller.backend.exceptions.UserNotFoundException;
import com.aljoschazoeller.backend.user.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

    public AppUser getAppUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Could not find appUser with ID '{}'", id);
                    return new UserNotFoundException("No appUser found with ID '" + id + "'");
                });
    }

    public AppUser findByGithubId(String githubId) {
        return userRepository.findAppUserByGithubId(githubId)
                .orElseThrow(() -> {
                    log.warn("Could not find appUser with GitHub ID '{}'", githubId);
                    return new UserNotFoundException("No appUser found with GitHub ID '" + githubId + "'");
                });
    }

    public boolean checkIfUserExistsById(String id) {
        return userRepository.existsById(id);
    }

    public AppUser register(OAuth2User oAuth2User, Instant registeredAt) {
        log.info("Register new apoUser with Github ID '{}'", oAuth2User.getAttributes().get("id"));
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

    public AppUser updateUser(AppUser appUser) {
        return userRepository.save(appUser);
    }
}
