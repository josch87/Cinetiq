package com.aljoschazoeller.backend.person.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewPersonDTO(
        @NotBlank(message = "First name must have at least one non-whitespace character")
        @Size(max = 50, message = "The field can be a maximum of 50 characters long.")
        String firstName,
        @NotBlank(message = "Last name must have at least one non-whitespace character")
        @Size(max = 50, message = "The field can be a maximum of 50 characters long.")
        String lastName
) {
}
