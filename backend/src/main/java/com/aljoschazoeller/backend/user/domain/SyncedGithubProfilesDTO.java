package com.aljoschazoeller.backend.user.domain;

public record SyncedGithubProfilesDTO(
        int totalUsers,
        int updatedUsers,
        int notUpdatedUsers,
        int notFoundUsers
) {
}
