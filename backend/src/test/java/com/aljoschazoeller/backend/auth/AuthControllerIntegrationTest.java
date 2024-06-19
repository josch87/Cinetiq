package com.aljoschazoeller.backend.auth;

import jakarta.servlet.ServletException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

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
        mockMvc.perform(get("/api/auth/me").with(oidcLogin().userInfoToken(token -> token
                                .claim("id", "11111")
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
                            "id": "11111",
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