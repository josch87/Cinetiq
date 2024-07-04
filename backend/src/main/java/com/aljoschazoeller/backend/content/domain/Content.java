package com.aljoschazoeller.backend.content.domain;

import com.aljoschazoeller.backend.user.domain.AppUser;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("content")
@With
public record Content(
        @Id
        String id,

        ContentStatus status,
        @DBRef
        AppUser statusUpdatedBy,
        Instant statusUpdatedAt,

        ContentType contentType,
        String originalTitle,
        String englishTitle,
        String germanTitle,

        @DBRef
        AppUser createdBy,
        Instant createdAt,

        @DBRef
        AppUser lastUpdatedBy,
        Instant lastUpdatedAt
) {
    public Content(
            String id,
            ContentType contentType,
            String originalTitle,
            String englishTitle,
            String germanTitle,
            AppUser createdBy,
            Instant createdAt
    ) {
        this(id,
                ContentStatus.ACTIVE,
                null,
                null,
                contentType,
                originalTitle,
                englishTitle,
                germanTitle,
                createdBy,
                createdAt,
                null,
                null);
    }

}
