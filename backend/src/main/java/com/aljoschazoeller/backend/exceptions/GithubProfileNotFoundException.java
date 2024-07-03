package com.aljoschazoeller.backend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;

@Getter
public class GithubProfileNotFoundException extends RuntimeException {

    private final HttpStatusCode status;
    private final String body;

    public GithubProfileNotFoundException(HttpStatusCode status, String body) {
        super(String.format("Error with status %s and body %s", status, body));
        this.status = status;
        this.body = body;
    }
}
