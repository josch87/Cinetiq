package com.aljoschazoeller.backend.content.domain;

import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("content")
public record Content(
        @Id
        String id,
        ContentType contentType,
        String englishTitle,
        String germanTitle,
        @DBRef
        AppUser createdBy,
        Instant createdAt
) {
}
