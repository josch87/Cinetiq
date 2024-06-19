package com.aljoschazoeller.backend.api;

public record ApiResponse<T>(
        ResponseInfo info,
        T data
) {
}
