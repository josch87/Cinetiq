package com.aljoschazoeller.backend.content.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.validation.constraints.NotBlank;

public record NewContentDTO(
        @JsonDeserialize(using = ContentTypeDeserializer.class)
        ContentType contentType,
        @NotBlank(message = "The Original Title must have at least one non-whitespace character")
        String originalTitle,
        String englishTitle,
        String germanTitle
) {
}
