package com.aljoschazoeller.backend.content.domain;

public record NewContentDTO(
        ContentType contentType,
        String originalTitle,
        String englishTitle,
        String germanTitle
) {
}
