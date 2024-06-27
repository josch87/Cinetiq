package com.aljoschazoeller.backend.validators;

import com.aljoschazoeller.backend.annotations.ValidContentType;
import com.aljoschazoeller.backend.content.domain.ContentType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;

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
            String validValues = Arrays.toString(ContentType.values());

            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("'" + value + "' is not a valid content type. Accepted values are " + validValues)
                    .addConstraintViolation();
            return false;
        }
    }
}
