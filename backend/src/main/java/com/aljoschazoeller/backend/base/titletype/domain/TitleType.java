package com.aljoschazoeller.backend.base.titletype.domain;

import org.springframework.data.annotation.Id;

public record TitleType(
        @Id
        String id,
        String name
) {
}
