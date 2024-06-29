package com.aljoschazoeller.backend.auth;

import com.aljoschazoeller.backend.auth.domain.LoggedInGithubUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public LoggedInGithubUser getMe(@AuthenticationPrincipal OAuth2User user) {
        Map<String, Object> attributes = user.getAttributes();

        return new LoggedInGithubUser(
                attributes.get("id").toString(),
                attributes.get("login") != null ? attributes.get("login").toString() : null,
                attributes.get("avatar_url") != null ? attributes.get("avatar_url").toString() : null,
                attributes.get("name") != null ? attributes.get("name").toString() : null,
                attributes.get("company") != null ? attributes.get("company").toString() : null,
                attributes.get("location") != null ? attributes.get("location").toString() : null,
                attributes.get("bio") != null ? attributes.get("bio").toString() : null
        );
    }
}
