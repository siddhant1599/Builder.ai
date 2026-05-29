package com.builder.ai.distributed_builder_ai.intelligence_service.service;

import com.builder.ai.distributed_builder_ai.intelligence_service.dto.chat.StreamResponse;
import reactor.core.publisher.Flux;

public interface AiGenerationService {
    Flux<StreamResponse> streamResponse(String message, Long projectId);
}
