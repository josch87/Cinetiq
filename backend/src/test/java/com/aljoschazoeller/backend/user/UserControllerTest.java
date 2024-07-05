package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.user.domain.AppUser;
import com.aljoschazoeller.backend.user.domain.AppUserStatus;
import com.aljoschazoeller.backend.user.domain.GithubUserProfile;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import okhttp3.mockwebserver.MockResponse;
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
import org.springframework.test.web.servlet.MvcResult;

import java.io.IOException;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    private static MockWebServer mockWebServer;


    @BeforeAll
    static void beforeAll() throws IOException {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
    }

    @AfterAll
    static void afterAll() throws IOException {
        mockWebServer.shutdown();
    }

    @DynamicPropertySource
    static void backendProperties(DynamicPropertyRegistry registry) {
        registry.add("github.api.url", () -> mockWebServer.url("/").toString());
    }

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
    void getAppUserByIdTest_whenNoAppUserFound_thenReturnNotFound() throws Exception {
        mockMvc.perform(get("/api/users/appUser-id-1"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("No appUser found with ID 'appUser-id-1'"));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void getAppUserByIdTest_whenAppUserFound_thenReturnAppUser() throws Exception {
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
                .githubId("1212")
                .githubUserProfileSynced(githubUserProfile)
                .githubUserProfileSyncedAt(Instant.parse("2024-06-12T14:13:12.152Z"))
                .githubUserProfileUpdatedAt(Instant.parse("2024-05-17T12:18:24.235Z"))
                .githubUserProfileActive(true)
                .status(AppUserStatus.ACTIVE)
                .createdAt(Instant.parse("2024-02-16T22:17:53.812Z"))
                .build();

        userRepository.save(appUser);

        mockMvc.perform(get("/api/users/appUser-id-1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "id": "appUser-id-1",
                                "githubId": "1212",
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
                .githubId("1212")
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
                                    "githubId": "1212",
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

    @Test
    @WithMockUser(value = "1212")
    @DirtiesContext
    void syncGithubUserProfilesTest_whenNoChangesOnGithubSinceLastSync_thenNoUpdatedUser() throws Exception {
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
                .githubId("1212")
                .githubUserProfileSynced(githubUserProfile)
                .githubUserProfileSyncedAt(Instant.parse("2024-06-12T14:13:12.152Z"))
                .githubUserProfileUpdatedAt(Instant.parse("2024-05-17T12:18:24.235Z"))
                .githubUserProfileActive(true)
                .status(AppUserStatus.ACTIVE)
                .createdAt(Instant.parse("2024-02-16T22:17:53.812Z"))
                .build();

        userRepository.save(appUser);

        mockWebServer.enqueue((new MockResponse()
                .setBody("""
                        {
                            "login": "github username",
                            "id": 1212,
                            "node_id": "MDQ6VXNlcjMzNTExOTE1",
                            "avatar_url": "avatarUrl",
                            "gravatar_id": "",
                            "url": "url",
                            "html_url": "htmlUrl",
                            "followers_url": "https://api.github.com/users/josch87/followers",
                            "following_url": "https://api.github.com/users/josch87/following{/other_user}",
                            "gists_url": "https://api.github.com/users/josch87/gists{/gist_id}",
                            "starred_url": "https://api.github.com/users/josch87/starred{/owner}{/repo}",
                            "subscriptions_url": "https://api.github.com/users/josch87/subscriptions",
                            "organizations_url": "https://api.github.com/users/josch87/orgs",
                            "repos_url": "https://api.github.com/users/josch87/repos",
                            "events_url": "https://api.github.com/users/josch87/events{/privacy}",
                            "received_events_url": "https://api.github.com/users/josch87/received_events",
                            "type": "User",
                            "site_admin": false,
                            "name": "github name",
                            "company": "github company",
                            "blog": "github blog",
                            "location": "github location",
                            "email": "github email",
                            "hireable": null,
                            "bio": "github bio",
                            "twitter_username": null,
                            "public_repos": 61,
                            "public_gists": 0,
                            "followers": 20,
                            "following": 25,
                            "created_at": "2020-12-12T12:16:51Z",
                            "updated_at": "2024-05-13T19:27:42Z"
                        }
                        """))
                .addHeader("Content-Type", "application/json"));

        mockMvc.perform(post("/api/users/sync-github-profiles"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "totalUsers": 1,
                            "updatedUsers": 0,
                            "notUpdatedUsers": 1,
                            "notFoundUsers": 0
                        }
                        """));
    }

    @Test
    @WithMockUser(value="1212")
    @DirtiesContext
    void syncGithubUserProfilesTest_whenChangesOnGithubSinceLastSync_thenOneUpdatedUser() throws Exception {
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
                .githubId("1212")
                .githubUserProfileSynced(githubUserProfile)
                .githubUserProfileSyncedAt(Instant.parse("2024-06-12T14:13:12.152Z"))
                .githubUserProfileUpdatedAt(Instant.parse("2024-05-17T12:18:24.235Z"))
                .githubUserProfileActive(true)
                .status(AppUserStatus.ACTIVE)
                .createdAt(Instant.parse("2024-02-16T22:17:53.812Z"))
                .build();

        userRepository.save(appUser);

        mockWebServer.enqueue((new MockResponse()
                .setBody("""
                        {
                            "login": "github username",
                            "id": "1212",
                            "node_id": "MDQ6VXNlcjMzNTExOTE1",
                            "avatar_url": "avatarUrl new",
                            "gravatar_id": "",
                            "url": "url new",
                            "html_url": "htmlUrl new",
                            "followers_url": "https://api.github.com/users/josch87/followers",
                            "following_url": "https://api.github.com/users/josch87/following{/other_user}",
                            "gists_url": "https://api.github.com/users/josch87/gists{/gist_id}",
                            "starred_url": "https://api.github.com/users/josch87/starred{/owner}{/repo}",
                            "subscriptions_url": "https://api.github.com/users/josch87/subscriptions",
                            "organizations_url": "https://api.github.com/users/josch87/orgs",
                            "repos_url": "https://api.github.com/users/josch87/repos",
                            "events_url": "https://api.github.com/users/josch87/events{/privacy}",
                            "received_events_url": "https://api.github.com/users/josch87/received_events",
                            "type": "User",
                            "site_admin": false,
                            "name": "github name",
                            "company": "github company",
                            "blog": "github blog",
                            "location": "github location",
                            "email": "github email",
                            "hireable": null,
                            "bio": "github bio",
                            "twitter_username": null,
                            "public_repos": 61,
                            "public_gists": 0,
                            "followers": 20,
                            "following": 25,
                            "created_at": "2020-12-12T12:16:51Z",
                            "updated_at": "2024-05-15T12:15:42Z"
                        }
                        """))
                .addHeader("Content-Type", "application/json"));

        mockMvc.perform(post("/api/users/sync-github-profiles"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "totalUsers": 1,
                            "updatedUsers": 1,
                            "notUpdatedUsers": 0,
                            "notFoundUsers": 0
                        }
                        """));

        MvcResult result = mockMvc.perform(get("/api/users/appUser-id-1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "id": "appUser-id-1",
                                "githubId": "1212",
                                "githubUserProfileSynced": {
                                    "login": "github username",
                                    "id": 1212,
                                    "avatar_url": "avatarUrl new",
                                    "url": "url new",
                                    "html_url": "htmlUrl new",
                                    "name": "github name",
                                    "company": "github company",
                                    "blog": "github blog",
                                    "location": "github location",
                                    "email": "github email",
                                    "bio": "github bio",
                                    "created_at": "2020-12-12T12:16:51Z",
                                    "updated_at": "2024-05-15T12:15:42Z"
                                },
                                "githubUserProfileActive": true,
                                "status": "ACTIVE",
                                "createdAt": "2024-02-16T22:17:53.812Z"
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.githubUserProfileSyncedAt").exists())
                .andExpect(jsonPath("$.data.githubUserProfileUpdatedAt").exists())
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<AppUser> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        AppUser savedAppUser = apiResponse.getData();

        assertTrue(savedAppUser.githubUserProfileSyncedAt().isAfter(appUser.githubUserProfileSyncedAt()));
        assertTrue(savedAppUser.githubUserProfileUpdatedAt().isAfter(appUser.githubUserProfileUpdatedAt()));
    }
}