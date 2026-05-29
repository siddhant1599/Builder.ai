package com.builder.ai.distributed_builder_ai.account_service.service;


import com.builder.ai.distributed_builder_ai.account_service.dto.auth.AuthResponse;
import com.builder.ai.distributed_builder_ai.account_service.dto.auth.LoginRequest;
import com.builder.ai.distributed_builder_ai.account_service.dto.auth.SignupRequest;

public interface AuthService {
    AuthResponse signup(SignupRequest request);

    AuthResponse login(LoginRequest request);
}
