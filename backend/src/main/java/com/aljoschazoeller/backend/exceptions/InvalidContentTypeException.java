package com.aljoschazoeller.backend.exceptions;

public class InvalidContentTypeException extends RuntimeException {
    public InvalidContentTypeException(String message) {
        super(message);
    }
}
