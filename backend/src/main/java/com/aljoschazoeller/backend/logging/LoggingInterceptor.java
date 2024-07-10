package com.aljoschazoeller.backend.logging;

import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.slf4j.MDC;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Optional;

public class LoggingInterceptor implements HandlerInterceptor {

    private final UserService userService;
    private static final String APP_USER_ID = "appUserId";

    public LoggingInterceptor(UserService userService) {
        this.userService = userService;
    }

    private Optional<Integer> getAuthenticatedGithubId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (
                authentication != null &&
                authentication.getPrincipal() instanceof OAuth2User oAuth2User &&
                oAuth2User.getAttribute("id") instanceof Integer githubId
        ) {
            return Optional.of(githubId);
        }

        return Optional.empty();
    }

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) {
        getAuthenticatedGithubId().ifPresentOrElse(
                githubId -> {
                    AppUser appUser = userService.findByGithubId(githubId.toString());
                    MDC.put(APP_USER_ID, appUser.id());
                },
                () -> MDC.put(APP_USER_ID, "N/A")
        );

        return true;
    }

    @Override
    public void afterCompletion(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler, Exception exception) {
        MDC.remove(APP_USER_ID);
    }
}
