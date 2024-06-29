package com.aljoschazoeller.backend.user.domain;

import java.time.Instant;

public record GithubUserProfile(
        String login,
        Integer id,
        String avatar_url,
        String url,
        String html_url,
        String name,
        String company,
        String blog,
        String location,
        String email,
        String bio,
        Instant created_at,
        Instant updated_at
) {
}
