package com.aljoschazoeller.backend.user.githubsync.domain;

import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "githubSyncLog")
public record GithubSyncLog(
        @Id
        String id,
        StartedBySystem startedBySystem,
        @DBRef
        AppUser startedBy,
        Instant startedAt,
        Instant finishedAt,
        SyncedGithubProfilesDTO result
) {
}
