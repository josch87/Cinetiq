package com.aljoschazoeller.backend.auth;

import com.aljoschazoeller.backend.user.UserRepository;
import com.aljoschazoeller.backend.user.domain.AppUser;
import jakarta.servlet.ServletException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;

    @Test
    void getMeTest_whenNotAuthenticated_thenReturnUnauthorized() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void getMeTest_whenAuthorizedAndNoId_thenThrowException() {
        assertThatThrownBy(() ->
                mockMvc.perform(get("/api/auth/me").with(oidcLogin().userInfoToken(token -> token
                        .claim("login", "testUser"))))
        )
                .isInstanceOf(ServletException.class);
    }

    @Test
    void getMeTest_whenAuthenticated_thenReturnGithubUser() throws Exception {
        AppUser user = AppUser.builder()
                .id("appUser-id-1")
                .githubId("1212")
                .createdAt(Instant.parse("2024-06-20T15:10:05.022Z"))
                .build();

        userRepository.save(user);

        mockMvc.perform(get("/api/auth/me").with(oidcLogin().userInfoToken(token -> token
                                .claim("id", 1212)
                                .claim("login", "testUser")
                                .claim("avatar_url", "testAvatarUrl")
                                .claim("name", "My Name")
                                .claim("company", "My Company")
                                .claim("location", "My Location")
                                .claim("bio", "My Biography")
                        ))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1212",
                            "username": "testUser",
                            "avatarUrl": "testAvatarUrl",
                            "name": "My Name",
                            "company": "My Company",
                            "location": "My Location",
                            "bio": "My Biography"
                        }
                        """));
    }
}