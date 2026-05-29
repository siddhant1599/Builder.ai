package com.builder.ai.distributed_builder_ai.intelligence_service.client;

import com.builder.ai.distributed_builder_ai.common_lib.dto.FileTreeDto;
import com.builder.ai.distributed_builder_ai.common_lib.enums.ProjectPermission;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "workspace-service", path = "/workspace", url="${WORKSPACE_SERVICE_URI:}")
public interface WorkspaceClient {

    @GetMapping("/internal/v1/projects/{projectId}/files/tree")
    FileTreeDto getFileTree(@PathVariable("projectId") Long projectId);

    @GetMapping("/internal/v1/projects/{projectId}/files/content")
    String getFileContent(@PathVariable("projectId") Long projectId, @RequestParam("path") String path);

    @GetMapping("/internal/v1/projects/{projectId}/permissions/check")
    boolean checkPermission(
            @PathVariable("projectId") Long projectId,
            @RequestParam("permission") ProjectPermission permission);
}
