package com.builder.ai.distributed_builder_ai.workspace_service.service.impl;

import com.builder.ai.distributed_builder_ai.common_lib.dto.PlanDto;
import com.builder.ai.distributed_builder_ai.common_lib.enums.ProjectPermission;
import com.builder.ai.distributed_builder_ai.common_lib.enums.ProjectRole;
import com.builder.ai.distributed_builder_ai.common_lib.error.BadRequestException;
import com.builder.ai.distributed_builder_ai.common_lib.error.ResourceNotFoundException;
import com.builder.ai.distributed_builder_ai.common_lib.security.AuthUtil;
import com.builder.ai.distributed_builder_ai.workspace_service.client.AccountClient;
import com.builder.ai.distributed_builder_ai.workspace_service.dto.project.ProjectRequest;
import com.builder.ai.distributed_builder_ai.workspace_service.dto.project.ProjectResponse;
import com.builder.ai.distributed_builder_ai.workspace_service.dto.project.ProjectSummaryResponse;
import com.builder.ai.distributed_builder_ai.workspace_service.entity.Project;
import com.builder.ai.distributed_builder_ai.workspace_service.entity.ProjectMember;
import com.builder.ai.distributed_builder_ai.workspace_service.entity.ProjectMemberId;
import com.builder.ai.distributed_builder_ai.workspace_service.mapper.ProjectMapper;
import com.builder.ai.distributed_builder_ai.workspace_service.repository.ProjectMemberRepository;
import com.builder.ai.distributed_builder_ai.workspace_service.repository.ProjectRepository;
import com.builder.ai.distributed_builder_ai.workspace_service.security.SecurityExpressions;
import com.builder.ai.distributed_builder_ai.workspace_service.service.ProjectService;
import com.builder.ai.distributed_builder_ai.workspace_service.service.ProjectTemplateService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Transactional
public class ProjectServiceImpl implements ProjectService {

    ProjectRepository projectRepository;
    ProjectMapper projectMapper;
    ProjectMemberRepository projectMemberRepository;
    AuthUtil authUtil;
    ProjectTemplateService projectTemplateService;
    AccountClient accountClient;
    SecurityExpressions securityExpressions;

    @Override
    public ProjectResponse createProject(ProjectRequest request) {

        if(!canCreateProject()) {
            throw new BadRequestException("User cannot create a New project with current Plan, Upgrade plan now.");
        }

        Long ownerUserId = authUtil.getCurrentUserId();

        Project project = Project.builder()
                .name(request.name())
                .isPublic(false)
                .build();
        project = projectRepository.save(project);

        ProjectMemberId projectMemberId = new ProjectMemberId(project.getId(), ownerUserId);
        ProjectMember projectMember = ProjectMember.builder()
                .id(projectMemberId)
                .projectRole(ProjectRole.OWNER)
                .acceptedAt(Instant.now())
                .invitedAt(Instant.now())
                .project(project)
                .build();
        projectMemberRepository.save(projectMember);

        projectTemplateService.initializeProjectFromTemplate(project.getId());

        return projectMapper.toProjectResponse(project);
    }

    @Override
    public List<ProjectSummaryResponse> getUserProjects() {
        Long userId = authUtil.getCurrentUserId();
        var projectsWithRoles = projectRepository.findAllAccessibleByUser(userId);
        return projectsWithRoles.stream()
                .map(p -> projectMapper.toProjectSummaryResponse(p.getProject(), p.getRole()))
                .toList();
    }

    @Override
    @PreAuthorize("@security.canViewProject(#projectId)")
    public ProjectSummaryResponse getUserProjectById(Long projectId) {
        Long userId = authUtil.getCurrentUserId();

        var projectWithRole = projectRepository.findAccessibleProjectByIdWithRole(projectId, userId)
                .orElseThrow(() -> new BadRequestException("Project Not Found"));

        return projectMapper.toProjectSummaryResponse(projectWithRole.getProject(), projectWithRole.getRole());
    }

    @Override
    @PreAuthorize("@security.canEditProject(#projectId)")
    public ProjectResponse updateProject(Long projectId, ProjectRequest request) {
        Long userId = authUtil.getCurrentUserId();
        Project project = getAccessibleProjectById(projectId, userId);

        project.setName(request.name());
        project = projectRepository.save(project);

        return projectMapper.toProjectResponse(project);
    }

    @Override
    @PreAuthorize("@security.canDeleteProject(#projectId)")
    public void softDelete(Long projectId) {
        Long userId = authUtil.getCurrentUserId();
        Project project = getAccessibleProjectById(projectId, userId);

        project.setDeletedAt(Instant.now());
        projectRepository.save(project);
    }

    @Override
    public boolean hasPermission(Long projectId, ProjectPermission permission) {
        return securityExpressions.hasPermission(projectId, permission);
    }

    ///  INTERNAL FUNCTIONS

    public Project getAccessibleProjectById(Long projectId, Long userId) {
        return projectRepository.findAccessibleProjectById(projectId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", projectId.toString()));
    }

    private boolean canCreateProject() {
        Long userId = authUtil.getCurrentUserId();
        if (userId == null) {
            return false;
        }
        PlanDto plan = accountClient.getCurrentSubscribedPlanByUser();

        int maxAllowed = plan.maxProjects();
        int ownedCount = projectMemberRepository.countProjectOwnedByUser(userId);

        return ownedCount < maxAllowed;
    }
}
