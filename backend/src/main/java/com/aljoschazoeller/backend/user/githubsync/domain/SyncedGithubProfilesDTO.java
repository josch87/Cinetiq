package com.aljoschazoeller.backend.user.githubsync.domain;

public record SyncedGithubProfilesDTO(
        int totalUsers,
        int updatedUsers,
        int notUpdatedUsers,
        int notFoundUsers
) {
}
