package com.builder.ai.distributed_builder_ai.common_lib.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Set;

import static com.builder.ai.distributed_builder_ai.common_lib.enums.ProjectPermission.*;

@RequiredArgsConstructor
@Getter
public enum ProjectRole {

    EDITOR(VIEW, EDIT, DELETE, VIEW_MEMBERS),
    VIEWER(Set.of(VIEW, VIEW_MEMBERS)),
    OWNER(Set.of(VIEW, EDIT, DELETE, MANAGE_MEMBERS, VIEW_MEMBERS));

    ProjectRole(ProjectPermission... permissions) {
        this.permissions = Set.of(permissions);
    }

    private final Set<ProjectPermission> permissions;
}
