package com.builder.ai.distributed_builder_ai.workspace_service.mapper;

import com.builder.ai.distributed_builder_ai.common_lib.enums.ProjectRole;
import com.builder.ai.distributed_builder_ai.workspace_service.dto.project.ProjectResponse;
import com.builder.ai.distributed_builder_ai.workspace_service.dto.project.ProjectSummaryResponse;
import com.builder.ai.distributed_builder_ai.workspace_service.entity.Project;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    ProjectResponse toProjectResponse(Project project);

    ProjectSummaryResponse toProjectSummaryResponse(Project project, ProjectRole role);

    List<ProjectSummaryResponse> toListOfProjectSummaryResponse(List<Project> projects);

}
