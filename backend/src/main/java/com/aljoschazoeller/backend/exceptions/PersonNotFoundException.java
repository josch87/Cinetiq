package com.aljoschazoeller.backend.exceptions;

public class PersonNotFoundException  extends RuntimeException {
    public PersonNotFoundException(String message) {
        super(message);
    }
}
