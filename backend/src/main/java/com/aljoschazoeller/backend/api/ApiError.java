package com.aljoschazoeller.backend.api;

import java.util.Map;

public record ApiError(
        Map<String, String> errors
) {
}
