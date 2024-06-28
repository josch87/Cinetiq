package com.aljoschazoeller.backend.validators;

import com.aljoschazoeller.backend.annotations.NullOrNotBlank;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NullOrNotBlankValidator  implements ConstraintValidator<NullOrNotBlank, String>  {


    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value == null || !value.trim().isEmpty();
    }
}
