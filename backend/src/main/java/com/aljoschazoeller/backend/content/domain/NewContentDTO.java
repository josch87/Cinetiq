package com.aljoschazoeller.backend.content.domain;

import com.aljoschazoeller.backend.contenttitle.ContentTitle;

import java.util.Map;

public record NewContentDTO(
        Map<String, ContentTitle> titles
) {
}
