package com.builder.ai.distributed_builder_ai.common_lib.dto;

public record PlanDto(
        Long id,
        String name,
        Integer maxProjects,
        Integer maxTokensPerDay,
        Boolean unlimitedAi,
        String price
) {
}