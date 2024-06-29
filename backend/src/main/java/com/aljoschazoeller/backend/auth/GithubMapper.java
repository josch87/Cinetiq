package com.aljoschazoeller.backend.auth;

import com.aljoschazoeller.backend.user.domain.GithubUserProfile;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.Instant;
import java.util.Map;

public class GithubMapper {

    private GithubMapper() {
        throw new UnsupportedOperationException("GithubMapper is a utility class and should not be instantiated.");
    }

    public static GithubUserProfile mapOAuth2UserToGithubUserProfile(OAuth2User user) {
        Map<String, Object> attributes = user.getAttributes();

        return new GithubUserProfile(
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
    }
}
