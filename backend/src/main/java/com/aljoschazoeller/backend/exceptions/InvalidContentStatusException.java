package com.aljoschazoeller.backend.exceptions;

public class InvalidContentStatusException extends RuntimeException {
    public InvalidContentStatusException(String message) {
        super(message);
    }
}
