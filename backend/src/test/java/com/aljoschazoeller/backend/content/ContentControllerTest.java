package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.user.UserRepository;
import com.aljoschazoeller.backend.user.domain.AppUser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.Instant;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ContentControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;

    @Test
    void getContentTest_whenNotAuthenticated_thenReturnUnauthorized() throws Exception {
        mockMvc.perform(get("/api/content"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }

    @Test
    @WithMockUser
    void getContentTest_whenNoContentInDatabase_thenReturnEmptyArray() throws Exception {
        mockMvc.perform(get("/api/content"))
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
    void getContentTest_whenOneContentInDatabase_thenReturnArrayWithOne() throws Exception {
        AppUser user = new AppUser(
                "appUser-id-1",
                "user",
                null,
                Instant.parse("2024-06-20T15:10:05.022Z"));

        userRepository.save(user);


        MvcResult result = mockMvc.perform(post("/api/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "contentType": "MOVIE",
                                    "originalTitle": "Original Title",
                                    "englishTitle": "English Title",
                                    "germanTitle": "German Title"
                                }
                                """))
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Content> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Content savedContent = apiResponse.getData();

        mockMvc.perform(get("/api/content"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": 1
                            },
                            "data": [
                                {
                                    "contentType": "MOVIE",
                                    "originalTitle": "Original Title",
                                    "englishTitle": "English Title",
                                    "germanTitle": "German Title",
                                    "createdBy": {
                                        "id": "appUser-id-1"
                                    }
                                }
                            ]
                        }
                        """))
                .andExpect(jsonPath("$.data[0].id").value(savedContent.id()))
                .andExpect(jsonPath("$.data[0].createdAt").exists());
    }

    @Test
    void getContentByIdTest_whenNotAuthenticated_thenReturnUnauthorized() throws Exception {
        mockMvc.perform(get("/api/content/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }

    @Test
    @WithMockUser
    void getContentByIdTest_whenIdNotFound_thenReturnNotFound() throws Exception {
        mockMvc.perform(get("/api/content/-1"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("No content found with ID '-1'."));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void getContentByIdTest_whenIdFound_thenReturnContent() throws Exception {
        AppUser user = new AppUser(
                "appUser-id-1",
                "user",
                null,
                Instant.parse("2024-06-20T15:10:05.022Z"));

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "contentType": "MOVIE",
                                  "originalTitle": "Original Title",
                                  "englishTitle": "English Title",
                                  "germanTitle": "German Title"
                                        }
                                """))
                .andExpect(status().isCreated())
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Content> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Content content = apiResponse.getData();

        mockMvc.perform(get("/api/content/" + content.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "contentType": "MOVIE",
                                "originalTitle": "Original Title",
                                "englishTitle": "English Title",
                                "germanTitle": "German Title",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.id").value(content.id()))
                .andExpect(jsonPath("$.data.createdAt").exists());
    }

    @Test
    void createContentTest_whenNotAuthenticated_thenReturnUnauthorized() throws Exception {
        mockMvc.perform(post("/api/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "contentType": "MOVIE",
                                    "originalTitle": "Original Title",
                                    "englishTitle": "English Title",
                                    "germanTitle": "German Title"
                                }
                                """))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createContentTest_whenAuthenticated_thenSaveContentInDatabase() throws Exception {
        AppUser user = new AppUser(
                "appUser-id-1",
                "user",
                null,
                Instant.parse("2024-06-20T15:10:05.022Z"));

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "contentType": "MOVIE",
                                  "originalTitle": "Original Title",
                                  "englishTitle": "English Title",
                                  "germanTitle": "German Title"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "contentType": "MOVIE",
                                "originalTitle": "Original Title",
                                "englishTitle": "English Title",
                                "germanTitle": "German Title",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.createdAt").exists())
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Content> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Content savedContent = apiResponse.getData();

        mockMvc.perform(get("/api/content"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": 1
                            },
                            "data": [
                                {
                                    "contentType": "MOVIE",
                                    "originalTitle": "Original Title",
                                    "englishTitle": "English Title",
                                    "germanTitle": "German Title",
                                    "createdBy": {
                                        "id": "appUser-id-1",
                                        "githubId": "user",
                                        "createdAt": "2024-06-20T15:10:05.022Z"
                                    }
                                }
                            ]
                        }
                        """))
                .andExpect(jsonPath("$.data[0].id").value(savedContent.id()))
                .andExpect(jsonPath("$.data[0].createdAt").exists());

    }

    @Test
    void updateContentByIdTest_whenNotAuthenticated_thenReturnUnauthorized() throws Exception {
        mockMvc.perform(patch("/api/content/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateContentByIdTest_whenAuthenticated_thenUpdateContentInDatabase() throws Exception {
        AppUser user = new AppUser(
                "appUser-id-1",
                "user",
                null,
                Instant.parse("2024-06-20T15:10:05.022Z"));

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "contentType": "MOVIE",
                                  "originalTitle": "Original Title",
                                  "englishTitle": "English Title",
                                  "germanTitle": "German Title"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "contentType": "MOVIE",
                                "originalTitle": "Original Title",
                                "englishTitle": "English Title",
                                "germanTitle": "German Title",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.createdAt").exists())
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Content> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Content oldContent = apiResponse.getData();


        mockMvc.perform(patch("/api/content/" + oldContent.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "originalTitle": "New Original Title",
                                    "englishTitle": "New English Title",
                                    "germanTitle": "New German Title"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "contentType": "MOVIE",
                                "originalTitle": "New Original Title",
                                "englishTitle": "New English Title",
                                "germanTitle": "New German Title",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                },
                                "lastUpdatedBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.lastUpdatedAt").exists());

        mockMvc.perform(get("/api/content/" + oldContent.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "contentType": "MOVIE",
                                "originalTitle": "New Original Title",
                                "englishTitle": "New English Title",
                                "germanTitle": "New German Title",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                },
                                "lastUpdatedBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.lastUpdatedAt").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateContentByIdTest_whenOriginalTitleEmptyString_thenReturnBadRequest() throws Exception {
        AppUser user = new AppUser(
                "appUser-id-1",
                "user",
                null,
                Instant.parse("2024-06-20T15:10:05.022Z"));

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "contentType": "MOVIE",
                                  "originalTitle": "Original Title",
                                  "englishTitle": "English Title",
                                  "germanTitle": "German Title"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "contentType": "MOVIE",
                                "originalTitle": "Original Title",
                                "englishTitle": "English Title",
                                "germanTitle": "German Title",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.createdAt").exists())
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Content> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Content oldContent = apiResponse.getData();


        mockMvc.perform(patch("/api/content/" + oldContent.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "originalTitle": "",
                                    "englishTitle": "New English Title",
                                    "germanTitle": "New German Title"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(content().json("""
                        {
                            "errors": {
                                "originalTitle": "The Original Title must have at least one non-whitespace character"
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.lastUpdatedAt").doesNotExist())
                .andExpect(jsonPath("$.data.lastUpdatedBy").doesNotExist());

        mockMvc.perform(get("/api/content/" + oldContent.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "contentType": "MOVIE",
                                "originalTitle": "Original Title",
                                "englishTitle": "English Title",
                                "germanTitle": "German Title",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.lastUpdatedAt").doesNotExist())
                .andExpect(jsonPath("$.data.lastUpdatedBy").doesNotExist());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateContentByIdTest_whenContentDeleted_thenReturnBadRequest() throws Exception {
        AppUser user = new AppUser(
                "appUser-id-1",
                "user",
                null,
                Instant.parse("2024-06-20T15:10:05.022Z"));

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "contentType": "MOVIE",
                                  "originalTitle": "Original Title",
                                  "englishTitle": "English Title",
                                  "germanTitle": "German Title"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "contentType": "MOVIE",
                                "originalTitle": "Original Title",
                                "englishTitle": "English Title",
                                "germanTitle": "German Title",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.createdAt").exists())
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Content> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Content oldContent = apiResponse.getData();

        mockMvc.perform(delete("/api/content/" + oldContent.id()))
                .andExpect(status().isNoContent())
                .andExpect(content().string(""));

        mockMvc.perform(patch("/api/content/" + oldContent.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "originalTitle": "New English Title",
                                    "englishTitle": "New English Title",
                                    "germanTitle": "New German Title"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Content with ID '" + oldContent.id() + "' is currently not active and can not be updated."))
                .andExpect(jsonPath("$.data.lastUpdatedAt").doesNotExist())
                .andExpect(jsonPath("$.data.lastUpdatedBy").doesNotExist());

        mockMvc.perform(get("/api/content/" + oldContent.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "contentType": "MOVIE",
                                "originalTitle": "Original Title",
                                "englishTitle": "English Title",
                                "germanTitle": "German Title",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.lastUpdatedAt").doesNotExist())
                .andExpect(jsonPath("$.data.lastUpdatedBy").doesNotExist());
    }

    @Test
    void softDeleteContentByIdTest_whenNotAuthenticated_thenReturnUnauthorized() throws Exception {
        mockMvc.perform(delete("/api/content/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void softDeleteContentByIdTest_whenAuthenticated_thenChangeStatusToDeleted() throws Exception {
        AppUser user = new AppUser(
                "appUser-id-1",
                "user",
                null,
                Instant.parse("2024-06-20T15:10:05.022Z"));

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "contentType": "MOVIE",
                                  "originalTitle": "Original Title",
                                  "englishTitle": "English Title",
                                  "germanTitle": "German Title"
                                }
                                """))
                .andExpect(status().isCreated())
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Content> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Content content = apiResponse.getData();

        mockMvc.perform(delete("/api/content/" + content.id()))
                .andExpect(status().isNoContent())
                .andExpect(content().string(""));

        mockMvc.perform(get("/api/content/" + content.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "status": "DELETED",
                                "statusUpdatedBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "user"
                                },
                                "contentType": "MOVIE",
                                "originalTitle": "Original Title",
                                "englishTitle": "English Title",
                                "germanTitle": "German Title"
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.statusUpdatedAt").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void softDeleteContentByIdTest_whenDeleted_thenNotInArray() throws Exception {
        AppUser user = new AppUser(
                "appUser-id-1",
                "user",
                null,
                Instant.parse("2024-06-20T15:10:05.022Z"));

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/content")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "contentType": "MOVIE",
                                  "originalTitle": "Original Title",
                                  "englishTitle": "English Title",
                                  "germanTitle": "German Title"
                                }
                                """))
                .andExpect(status().isCreated())
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Content> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Content content = apiResponse.getData();

        mockMvc.perform(delete("/api/content/" + content.id()))
                .andExpect(status().isNoContent())
                .andExpect(content().string(""));

        mockMvc.perform(get("/api/content"))
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
}