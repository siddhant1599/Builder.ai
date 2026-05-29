package com.builder.ai.distributed_builder_ai.intelligence_service.repository;

import com.builder.ai.distributed_builder_ai.intelligence_service.entity.ChatSession;
import com.builder.ai.distributed_builder_ai.intelligence_service.entity.ChatSessionId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatSessionRepository extends JpaRepository<ChatSession, ChatSessionId> {
}
