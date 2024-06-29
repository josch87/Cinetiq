package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.exceptions.UserNotFoundException;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

    public AppUser findByGithubId(String githubId) {
        return userRepository.findAppUserByGithubId(githubId)
                .orElseThrow(() -> new UserNotFoundException("No appUser found with GitHub ID '" + githubId + "'"));
    }

    public AppUser register(OAuth2User oAuth2User, Instant registeredAt) {
        AppUser appUserToSave = new AppUser(
                null,
                oAuth2User.getAttributes().get("id").toString(),
                oAuth2User.getAttributes(),
                registeredAt
        );

        return userRepository.save(appUserToSave);
    }
}
