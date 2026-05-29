package com.builder.ai.distributed_builder_ai.api_gateway.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.List;

public record ApiError(
        HttpStatus httpStatus,
        String message,
        Instant timestamp,
        @JsonInclude(JsonInclude.Include.NON_NULL) List<ApiFieldError> errors
) {
    public ApiError(HttpStatus code, List<ApiFieldError> errors) {
        this(code, "Validation failed", Instant.now(), errors);
    }

    public ApiError(HttpStatus code, String message) {
        this(code, message, Instant.now(), null);
    }

    public ApiError(HttpStatus code, String message, Instant timestamp) {
        this(code, message, timestamp, null);
    }
}

record ApiFieldError(String field, String message) {}