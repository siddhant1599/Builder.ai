package com.builder.ai.distributed_builder_ai.workspace_service.service;


import com.builder.ai.distributed_builder_ai.common_lib.dto.FileTreeDto;
import com.builder.ai.distributed_builder_ai.workspace_service.dto.project.FileContentResponse;

public interface ProjectFileService {
    FileTreeDto getFileTree(Long projectId);

    String getFileContent(Long projectId, String path);

    void saveFile(Long projectId, String filePath, String fileContent);
}
