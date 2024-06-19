package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AppUser findByGithubId(String githubId) {
        return userRepository.findAppUserByGithubId(githubId)
                .orElseThrow();
    }

    public AppUser register(OAuth2User oAuth2User) {
        AppUser appUserToSave = new AppUser(
                null,
                oAuth2User.getAttributes().get("id").toString(),
                oAuth2User.getAttributes(),
                Instant.now()
        );

        return userRepository.save(appUserToSave);
    }
}
