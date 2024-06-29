package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.exceptions.UserNotFoundException;
import com.aljoschazoeller.backend.user.domain.AppUser;
import com.aljoschazoeller.backend.user.domain.GithubUserProfile;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

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
        Map<String, Object> attributes = oAuth2User.getAttributes();

        GithubUserProfile githubUserProfile = new GithubUserProfile(
                attributes.get("login").toString(),
                (Integer) attributes.get("id"),
                attributes.get("avatar_url").toString(),
                attributes.get("url").toString(),
                attributes.get("html_url").toString(),
                attributes.get("name") != null ? attributes.get("name").toString() : null,
                attributes.get("company") != null ? attributes.get("company").toString() : null,
                attributes.get("blog") != null ? attributes.get("blog").toString() : null,
                attributes.get("location") != null ? attributes.get("location").toString() : null,
                attributes.get("email") != null ? attributes.get("email").toString() : null,
                attributes.get("bio") != null ? attributes.get("bio").toString() : null,
                Instant.parse(attributes.get("created_at").toString()),
                Instant.parse(attributes.get("updated_at").toString())
        );

        AppUser appUserToSave = new AppUser(
                null,
                oAuth2User.getAttributes().get("id").toString(),
                oAuth2User.getAttributes(),
                githubUserProfile,
                registeredAt
        );

        return userRepository.save(appUserToSave);
    }
}
