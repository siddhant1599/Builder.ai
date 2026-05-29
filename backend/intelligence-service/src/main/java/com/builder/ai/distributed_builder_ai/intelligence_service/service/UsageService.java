package com.builder.ai.distributed_builder_ai.intelligence_service.service;

public interface UsageService {
    void recordTokenUsage(Long userId, int actualTokens);
    void checkDailyTokensUsage();
}
