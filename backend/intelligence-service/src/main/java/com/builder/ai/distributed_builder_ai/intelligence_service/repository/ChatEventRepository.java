package com.builder.ai.distributed_builder_ai.intelligence_service.repository;

import com.builder.ai.distributed_builder_ai.intelligence_service.entity.ChatEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatEventRepository extends JpaRepository<ChatEvent, Long> {
    Optional<ChatEvent> findBySagaId(String s);
}
