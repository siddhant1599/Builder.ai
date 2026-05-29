package com.builder.ai.distributed_builder_ai.intelligence_service.entity;

import com.builder.ai.distributed_builder_ai.common_lib.enums.ChatEventStatus;
import com.builder.ai.distributed_builder_ai.common_lib.enums.ChatEventType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "chat_events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    ChatMessage chatMessage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    ChatEventType type;

    @Column(nullable = false)
    Integer sequenceOrder;

    @Column(columnDefinition = "text")
    String content;

    String filePath; // NULL unless FILE_EDIT

    @Column(columnDefinition = "text")
    String metadata;

    String sagaId;

    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
    ChatEventStatus status;

}
