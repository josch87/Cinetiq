package com.aljoschazoeller.backend.content.domain;

import com.aljoschazoeller.backend.contenttitle.ContentTitle;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Map;

@Document("content")
public record Content(
        @Id
        String id,
        Map<String, ContentTitle> titles,
        @DBRef
        AppUser createdBy,
        Instant createdAt
) {
}
