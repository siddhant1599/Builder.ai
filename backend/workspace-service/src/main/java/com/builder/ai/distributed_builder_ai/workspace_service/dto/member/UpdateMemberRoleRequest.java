package com.builder.ai.distributed_builder_ai.workspace_service.dto.member;

import com.builder.ai.distributed_builder_ai.common_lib.enums.ProjectRole;
import jakarta.validation.constraints.NotNull;

public record UpdateMemberRoleRequest(
        @NotNull ProjectRole role) {
}
