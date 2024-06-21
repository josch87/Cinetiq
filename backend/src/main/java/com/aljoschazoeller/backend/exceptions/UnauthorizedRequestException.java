package com.aljoschazoeller.backend.exceptions;

public class UnauthorizedRequestException  extends RuntimeException {
    public UnauthorizedRequestException(String message) {
        super(message);
    }
}
