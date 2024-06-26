package com.aljoschazoeller.backend.content.domain;

import lombok.Getter;

@Getter
public enum ContentType {
    MOVIE("movie"),
    SERIES("series"),
    EXHIBITION("exhibition");

    private final String value;

    ContentType(String value) {
        this.value = value;
    }

}
