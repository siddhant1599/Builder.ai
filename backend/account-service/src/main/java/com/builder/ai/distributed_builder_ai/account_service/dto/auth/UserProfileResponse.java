package com.builder.ai.distributed_builder_ai.account_service.dto.auth;

public record UserProfileResponse(
        Long id,
        String username,
        String name
) {
}
