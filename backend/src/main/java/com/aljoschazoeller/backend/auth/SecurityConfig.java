package com.aljoschazoeller.backend.auth;

import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.url}")
    private String appUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(a -> a
                        .requestMatchers("/api/auth/me").authenticated()
                        .requestMatchers("/api/secured").authenticated()
                        .anyRequest().permitAll()
                )
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .oauth2Login(o -> o.defaultSuccessUrl(appUrl))
                .logout(l -> l.logoutSuccessUrl(appUrl));
        return http.build();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService(UserService userService) {
        DefaultOAuth2UserService defaultOAuth2UserService = new DefaultOAuth2UserService();

        return userRequest -> {
            OAuth2User oAuth2User = defaultOAuth2UserService.loadUser(userRequest);

            AppUser appUser;
            try {
                appUser = userService.findByGithubId(oAuth2User.getName());
            } catch (NoSuchElementException exception) {
                appUser = userService.register(oAuth2User);
            }

            Map<String, Object> attributes = new HashMap<>(oAuth2User.getAttributes());
            attributes.put("appUser", appUser);

            return new DefaultOAuth2User(null, attributes, "id");
        };
    }
}
