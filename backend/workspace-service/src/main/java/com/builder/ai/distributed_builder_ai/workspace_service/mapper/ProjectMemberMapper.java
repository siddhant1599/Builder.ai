package com.builder.ai.distributed_builder_ai.workspace_service.mapper;

import com.builder.ai.distributed_builder_ai.workspace_service.dto.member.MemberResponse;
import com.builder.ai.distributed_builder_ai.workspace_service.entity.ProjectMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectMemberMapper {

    @Mapping(target = "userId", source = "id.userId")
    MemberResponse toProjectMemberResponseFromMember(ProjectMember projectMember);
}
