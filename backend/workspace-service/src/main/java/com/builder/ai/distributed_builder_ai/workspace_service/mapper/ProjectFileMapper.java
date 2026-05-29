package com.builder.ai.distributed_builder_ai.workspace_service.mapper;

import com.builder.ai.distributed_builder_ai.common_lib.dto.FileNode;
import com.builder.ai.distributed_builder_ai.workspace_service.entity.ProjectFile;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectFileMapper {

    List<FileNode> toListOfFileNode(List<ProjectFile> projectFileList);
}
