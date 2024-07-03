package com.aljoschazoeller.backend.person.domain;

import com.aljoschazoeller.backend.user.domain.AppUser;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("people")
@Builder
public record Person(
        @Id
        String id,

        PersonStatus status,
        @DBRef
        AppUser statusUpdatedBy,
        Instant statusUpdatedAt,

        String firstName,
        String lastName,

        @DBRef
        AppUser createdBy,
        Instant createdAt
) {
}
