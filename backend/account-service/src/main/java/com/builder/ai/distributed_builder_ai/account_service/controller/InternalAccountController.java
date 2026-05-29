package com.builder.ai.distributed_builder_ai.account_service.controller;

import com.builder.ai.distributed_builder_ai.account_service.mapper.UserMapper;
import com.builder.ai.distributed_builder_ai.account_service.repository.UserRepository;
import com.builder.ai.distributed_builder_ai.account_service.service.SubscriptionService;
import com.builder.ai.distributed_builder_ai.common_lib.dto.PlanDto;
import com.builder.ai.distributed_builder_ai.common_lib.dto.UserDto;
import com.builder.ai.distributed_builder_ai.common_lib.error.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/internal/v1")
@RequiredArgsConstructor
public class InternalAccountController {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final SubscriptionService subscriptionService;

    @GetMapping("/users/{id}")
    public UserDto getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(userMapper::toUserDto)
                .orElseThrow(() -> new ResourceNotFoundException("User", id.toString()));
    }

    @GetMapping("/users/by-email")
    public Optional<UserDto> getUserByEmail(@RequestParam String email) {
        return userRepository.findByUsernameIgnoreCase(email)
                .map(userMapper::toUserDto);
    }

    @GetMapping("/billing/current-plan")
    public PlanDto getCurrentSubscribedPlan() {
        return subscriptionService.getCurrentSubscribedPlanByUser();
    }
}
