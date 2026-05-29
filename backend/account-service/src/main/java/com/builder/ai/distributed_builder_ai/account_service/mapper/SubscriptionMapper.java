package com.builder.ai.distributed_builder_ai.account_service.mapper;

import com.builder.ai.distributed_builder_ai.account_service.dto.subscription.SubscriptionResponse;
import com.builder.ai.distributed_builder_ai.account_service.entity.Plan;
import com.builder.ai.distributed_builder_ai.account_service.entity.Subscription;
import com.builder.ai.distributed_builder_ai.common_lib.dto.PlanDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubscriptionMapper {

    SubscriptionResponse toSubscriptionResponse(Subscription subscription);

    PlanDto toPlanResponse(Plan plan);
}
