package com.aljoschazoeller.backend.auth.domain;

public record LoggedInGithubUser(
        String id,
        String username,
        String avatarUrl,
        String name,
        String company,
        String location,
        String bio
) {
}
