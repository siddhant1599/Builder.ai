package com.builder.ai.distributed_builder_ai.workspace_service.service;

import com.builder.ai.distributed_builder_ai.workspace_service.dto.project.DeployResponse;
import org.jspecify.annotations.Nullable;

public interface DeploymentService {
    @Nullable DeployResponse deploy(Long projectId);
}
