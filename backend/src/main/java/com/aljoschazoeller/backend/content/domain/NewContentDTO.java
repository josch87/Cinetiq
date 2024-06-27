package com.aljoschazoeller.backend.content.domain;

import com.aljoschazoeller.backend.annotations.ValidContentType;
import jakarta.validation.constraints.NotBlank;

public record NewContentDTO(
//        @JsonDeserialize(using = ContentTypeDeserializer.class)
        @ValidContentType
        String contentType,
        @NotBlank(message = "The Original Title must have at least one non-whitespace character")
        String originalTitle,
        String englishTitle,
        String germanTitle
) {

        public ContentType getContentTypeAsEnum () {
                return ContentType.valueOf(this.contentType);
        }
}
