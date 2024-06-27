package com.aljoschazoeller.backend.exceptions;

import java.util.List;

public class NotAllowedUpdateFieldsException extends RuntimeException {
    public NotAllowedUpdateFieldsException(List<String> invalidFields) {
        super("Updates on the following fields are not allowed: " + String.join(", ", invalidFields));
    }
}
