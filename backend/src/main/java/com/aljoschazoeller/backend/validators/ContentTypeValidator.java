package com.aljoschazoeller.backend.validators;

import com.aljoschazoeller.backend.annotations.ValidContentType;
import com.aljoschazoeller.backend.content.domain.ContentType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ContentTypeValidator implements ConstraintValidator<ValidContentType, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        try {
            ContentType.valueOf(value);
            return true;
        } catch (IllegalArgumentException exception) {
            return false;
        }
    }
}
