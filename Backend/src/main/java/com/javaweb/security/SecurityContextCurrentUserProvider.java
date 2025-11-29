package com.javaweb.security;
import java.util.Map;
import java.util.Optional;
import com.javaweb.models.entity.User;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class SecurityContextCurrentUserProvider implements CurrentUserProvider {

    @Override
    public String getCurrentUsername() {
        return getCurrentUsernameOptional()
                .orElseThrow(() -> new IllegalStateException("No authenticated user found in security context"));
    }

    @Override
    public Optional<String> getCurrentUsernameOptional() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof String && "anonymousUser".equals(principal)) {
            return Optional.empty();
        }
        return Optional.ofNullable(authentication.getName());
    }
    public Integer getCurrentUserId() {
        return getCurrentUserIdOptional()
                .orElseThrow(() -> new IllegalStateException("No user ID found in security context"));
    }

    public Optional<Integer> getCurrentUserIdOptional() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return Optional.empty();

        Object principal = auth.getPrincipal();

        // TRƯỜNG HỢP CỦA BẠN: User entity
        if (principal instanceof User user) {
            return Optional.ofNullable(user.getId());
        }

        return Optional.empty();
    }
}
