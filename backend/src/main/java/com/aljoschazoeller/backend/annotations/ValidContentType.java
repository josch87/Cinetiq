package com.aljoschazoeller.backend.annotations;

import com.aljoschazoeller.backend.validators.ContentTypeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = ContentTypeValidator.class)
public @interface ValidContentType {
    String message() default "Invalid content type";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
