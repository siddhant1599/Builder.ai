package com.builder.ai.distributed_builder_ai.account_service.dto.subscription;

import com.builder.ai.distributed_builder_ai.common_lib.dto.PlanDto;

import java.time.Instant;

public record SubscriptionResponse(
        PlanDto plan,
        String status,
        Instant currentPeriodEnd,
        Long tokensUsedThisCycle
) {
}
