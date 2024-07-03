package com.aljoschazoeller.backend.person.domain;

import jakarta.validation.constraints.NotBlank;

public record NewPersonDTO(
        @NotBlank(message = "First name must have at least one non-whitespace character")
        String firstName,
        @NotBlank(message = "Last name must have at least one non-whitespace character")
        String lastName
) {
}
