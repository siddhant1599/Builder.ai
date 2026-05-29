package com.builder.ai.distributed_builder_ai.workspace_service.dto.project;


import com.builder.ai.distributed_builder_ai.common_lib.enums.ProjectRole;

import java.time.Instant;

public record ProjectSummaryResponse(
        Long id,
        String name,
        Instant createdAt,
        Instant updatedAt,
        ProjectRole role
) {
}
