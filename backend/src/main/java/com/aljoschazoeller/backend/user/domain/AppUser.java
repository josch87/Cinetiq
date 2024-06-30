package com.aljoschazoeller.backend.user.domain;

import lombok.Builder;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Map;

@Document("appUsers")
@With
@Builder
public record AppUser(
        @Id
        String id,
        String githubId,
        Map<String, Object> githubUserProfileOnSignUp, // Profile during first signup
        GithubUserProfile githubUserProfileSynced,
        Instant githubUserProfileSyncedAt,
        Instant githubUserProfileUpdatedAt,
        boolean githubUserProfileActive,
        Instant createdAt
) {
}
