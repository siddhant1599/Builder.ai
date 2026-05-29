package com.builder.ai.distributed_builder_ai.workspace_service.repository;

import com.builder.ai.distributed_builder_ai.workspace_service.entity.ProcessedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessedEventRepository extends JpaRepository<ProcessedEvent, String> {
}
