package com.builder.ai.distributed_builder_ai.account_service.mapper;

import com.builder.ai.distributed_builder_ai.account_service.dto.auth.SignupRequest;
import com.builder.ai.distributed_builder_ai.account_service.dto.auth.UserProfileResponse;
import com.builder.ai.distributed_builder_ai.account_service.entity.User;
import com.builder.ai.distributed_builder_ai.common_lib.dto.UserDto;
import com.builder.ai.distributed_builder_ai.common_lib.security.JwtUserPrincipal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(SignupRequest signupRequest);

    @Mapping(source = "userId", target = "id")
    UserProfileResponse toUserProfileResponse(JwtUserPrincipal user);

    UserDto toUserDto(User user);

}
