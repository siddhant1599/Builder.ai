package com.builder.ai.distributed_builder_ai.intelligence_service.service;


import com.builder.ai.distributed_builder_ai.intelligence_service.dto.chat.ChatResponse;

import java.util.List;

public interface ChatService {

    List<ChatResponse> getProjectChatHistory(Long projectId);
}
