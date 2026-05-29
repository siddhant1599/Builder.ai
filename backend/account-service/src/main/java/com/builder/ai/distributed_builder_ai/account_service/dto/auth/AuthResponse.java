package com.builder.ai.distributed_builder_ai.account_service.dto.auth;

public record AuthResponse(
        String token,
        UserProfileResponse user
) {

}
