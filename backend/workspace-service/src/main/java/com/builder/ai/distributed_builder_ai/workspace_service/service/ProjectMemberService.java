package com.builder.ai.distributed_builder_ai.workspace_service.service;


import com.builder.ai.distributed_builder_ai.workspace_service.dto.member.InviteMemberRequest;
import com.builder.ai.distributed_builder_ai.workspace_service.dto.member.MemberResponse;
import com.builder.ai.distributed_builder_ai.workspace_service.dto.member.UpdateMemberRoleRequest;

import java.util.List;

public interface ProjectMemberService {
    List<MemberResponse> getProjectMembers(Long projectId);

    MemberResponse inviteMember(Long projectId, InviteMemberRequest request);

    MemberResponse updateMemberRole(Long projectId, Long memberId, UpdateMemberRoleRequest request);

    void removeProjectMember(Long projectId, Long memberId);
}
