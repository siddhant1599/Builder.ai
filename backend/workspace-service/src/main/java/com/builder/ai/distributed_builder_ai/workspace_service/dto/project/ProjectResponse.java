package com.builder.ai.distributed_builder_ai.workspace_service.dto.project;


import java.time.Instant;

public record ProjectResponse(
        Long id,
        String name,
        Instant createdAt,
        Instant updatedAt
) {
}
