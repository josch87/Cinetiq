package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.user.domain.AppUser;
import com.aljoschazoeller.backend.user.domain.AppUserStatus;
import com.aljoschazoeller.backend.user.domain.GithubUserProfile;
import com.aljoschazoeller.backend.user.domain.SyncedGithubProfilesDTO;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    void getAllUsersTest_whenNotAuthenticated_thenReturnIsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }

    @Test
    @WithMockUser
    void getAllUsersTest_whenNoUser_thenReturnEmptyList() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": 0
                            },
                            "data": []
                        }
                        """));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void getAllUsersTest_whenOneUser_thenReturnListOfOne() throws Exception {
        GithubUserProfile githubUserProfile = new GithubUserProfile(
                "github username",
                1212,
                "avatarUrl",
                "url",
                "htmlUrl",
                "github name",
                "github company",
                "github blog",
                "github location",
                "github email",
                "github bio",
                Instant.parse("2020-12-12T12:16:51.122Z"),
                Instant.parse("2024-05-13T19:27:42.271Z")
        );

        AppUser appUser = AppUser.builder()
                .id("appUser-id-1")
                .githubId("github-id-1")
                .githubUserProfileSynced(githubUserProfile)
                .githubUserProfileSyncedAt(Instant.parse("2024-06-12T14:13:12.152Z"))
                .githubUserProfileUpdatedAt(Instant.parse("2024-05-17T12:18:24.235Z"))
                .githubUserProfileActive(true)
                .status(AppUserStatus.ACTIVE)
                .createdAt(Instant.parse("2024-02-16T22:17:53.812Z"))
                .build();

        userRepository.save(appUser);

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": 1
                            },
                            "data": [
                                {
                                    "id": "appUser-id-1",
                                    "githubId": "github-id-1",
                                    "githubUserProfileSynced": {
                                        "login": "github username",
                                        "id": 1212,
                                        "avatar_url": "avatarUrl",
                                        "url": "url",
                                        "html_url": "htmlUrl",
                                        "name": "github name",
                                        "company": "github company",
                                        "blog": "github blog",
                                        "location": "github location",
                                        "email": "github email",
                                        "bio": "github bio",
                                        "created_at": "2020-12-12T12:16:51.122Z",
                                        "updated_at": "2024-05-13T19:27:42.271Z"
                                    },
                                    "githubUserProfileSyncedAt": "2024-06-12T14:13:12.152Z",
                                    "githubUserProfileUpdatedAt": "2024-05-17T12:18:24.235Z",
                                    "githubUserProfileActive": true,
                                    "status": "ACTIVE",
                                    "createdAt": "2024-02-16T22:17:53.812Z"
                                }
                            ]
                        }
                        """));
    }

    @Test
    void syncGithubUserProfilesTest_whenNotAuthenticated_thenReturnNoIsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/users/sync-github-profiles"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }
}