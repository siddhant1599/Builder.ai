package com.builder.ai.distributed_builder_ai.intelligence_service.entity;

import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class ChatSessionId implements Serializable {
    Long projectId;
    Long userId;
}
