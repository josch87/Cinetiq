package com.aljoschazoeller.backend.user.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Map;

@Document("appUsers")
public record AppUser(
        @Id
        String id,
        String githubId,
        Map<String, Object> githubUserProfile, // Profile during first signup
        Instant createdAt
) {
}
