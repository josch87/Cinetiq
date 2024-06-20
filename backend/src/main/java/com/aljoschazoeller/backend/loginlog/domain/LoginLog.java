package com.aljoschazoeller.backend.loginlog.domain;

import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("loginLogs")
public record LoginLog(
        @Id
        String id,
        @DBRef
        AppUser appUser,
        Instant createdAt,
        String ipAddress,
        String userAgent
) {
}
