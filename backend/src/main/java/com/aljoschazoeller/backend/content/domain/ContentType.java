package com.aljoschazoeller.backend.content.domain;

public enum ContentType {
    MOVIE("movie"),
    SERIES("series");

    private final String value;

    ContentType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
