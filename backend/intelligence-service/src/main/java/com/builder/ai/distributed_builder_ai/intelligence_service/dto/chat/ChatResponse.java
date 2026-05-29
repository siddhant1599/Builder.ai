package com.builder.ai.distributed_builder_ai.intelligence_service.dto.chat;


import com.builder.ai.distributed_builder_ai.common_lib.enums.MessageRole;

import java.time.Instant;
import java.util.List;

public record ChatResponse(
        Long id,
        MessageRole role,
        List<ChatEventResponse> events,
        String content,
        Integer tokensUsed,
        Instant createdAt

) {
}
