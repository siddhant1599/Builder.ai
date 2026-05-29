package com.builder.ai.distributed_builder_ai.intelligence_service.dto.chat;


import com.builder.ai.distributed_builder_ai.common_lib.enums.ChatEventType;

public record ChatEventResponse(
        Long id,
        ChatEventType type,
        Integer sequenceOrder,
        String content,
        String filePath,
        String metadata
) {
}
