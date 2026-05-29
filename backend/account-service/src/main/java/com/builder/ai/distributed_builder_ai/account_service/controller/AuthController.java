package com.builder.ai.distributed_builder_ai.account_service.controller;

import com.builder.ai.distributed_builder_ai.account_service.dto.auth.AuthResponse;
import com.builder.ai.distributed_builder_ai.account_service.dto.auth.LoginRequest;
import com.builder.ai.distributed_builder_ai.account_service.dto.auth.SignupRequest;
import com.builder.ai.distributed_builder_ai.account_service.dto.auth.UserProfileResponse;
import com.builder.ai.distributed_builder_ai.account_service.service.AuthService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AuthController {

    AuthService authService;
//    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

//    @GetMapping("/me")
//    public ResponseEntity<UserProfileResponse> getProfile() {
//        Long userId = 1L;
//        return ResponseEntity.ok(userService.getProfile(userId));
//    } TODO

}
