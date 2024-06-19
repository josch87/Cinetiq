package com.aljoschazoeller.backend.content.domain;

public record NewContentDTO(
        ContentType contentType,
        String englishTitle,
        String germanTitle
) {
}
