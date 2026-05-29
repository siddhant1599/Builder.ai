package com.builder.ai.distributed_builder_ai.workspace_service.dto.member;


import com.builder.ai.distributed_builder_ai.common_lib.enums.ProjectRole;

import java.time.Instant;

public record MemberResponse(
        Long userId,
        String username,
        String name,
        ProjectRole projectRole,
        Instant invitedAt
) {
}
