package com.aljoschazoeller.backend.person.domain;

import jakarta.validation.constraints.NotBlank;

public record NewPersonDTO(
        @NotBlank
        String firstName,
        @NotBlank
        String lastName
) {
}
