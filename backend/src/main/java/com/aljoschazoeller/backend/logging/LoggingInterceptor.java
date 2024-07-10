package com.aljoschazoeller.backend.logging;

import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Optional;

public class LoggingInterceptor implements HandlerInterceptor {

    private final UserService userService;
    private static final String APP_USER_ID = "appUserId";
    private static final Logger log = LoggerFactory.getLogger(LoggingInterceptor.class);

    public LoggingInterceptor(UserService userService) {
        log.error("BEFORE USER SERVICE");
        this.userService = userService;
        log.error("AFTER USER SERVICE");
    }

    private Optional<Integer> getAuthenticatedGithubId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.error("PRINCIPAL {}", authentication.getPrincipal());

        if (
                authentication.getPrincipal() instanceof OAuth2User oAuth2User &&
                oAuth2User.getAttribute("id") instanceof Integer githubId
        ) {
            return Optional.of(githubId);
        }

        return Optional.empty();
    }

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) {
        log.error("BEFORE GET USER ID");
        getAuthenticatedGithubId().ifPresentOrElse(
                githubId -> {
                    log.error("GITHUB ID: {}", githubId);
                    AppUser appUser = userService.findByGithubId(githubId.toString());
                    log.error("BEFORE MDC PUT");
                    MDC.put(APP_USER_ID, appUser.id());
                    log.error("AFTER MDC PUT");
                },
                () -> {
                    log.error("BEFORE MDC PUT 2");
                    MDC.put(APP_USER_ID, "N/A");
                    log.error("AFTER MDC PUT 2");
                }
        );

        return true;
    }

    @Override
    public void afterCompletion(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler, Exception exception) {
        MDC.remove(APP_USER_ID);
    }
}
