package com.aljoschazoeller.backend.annotations;

import com.aljoschazoeller.backend.validators.NullOrNotBlankValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = NullOrNotBlankValidator.class)
public @interface NullOrNotBlank {
    String message() default "The field must have at least one non-whitespace character";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
