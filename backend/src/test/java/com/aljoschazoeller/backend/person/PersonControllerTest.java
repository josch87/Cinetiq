package com.aljoschazoeller.backend.person;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.person.domain.Person;
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
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.Instant;

import static com.aljoschazoeller.backend.testutil.GithubOAuth2LoginTestHelper.createGithubOAuth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PersonControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;

    @Test
    void getPeopleTest_whenNotAuthenticated_thenReturnUnauthorized() throws Exception {
        mockMvc.perform(get("/api/people"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }

    @Test
    void getPeopleTest_whenNoPersonInDatabase_thenReturnEmptyList() throws Exception {
        AppUser user = AppUser.builder()
                .id("appUser-id-1")
                .githubId("1212")
                .createdAt(Instant.parse("2024-06-20T15:10:05.022Z"))
                .build();

        userRepository.save(user);

        mockMvc.perform(get("/api/people")
                        .with(createGithubOAuth2Login(1212))
                )
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
    void getPeopleTest_whenOnePersonInDatabase_thenReturnListOfOne() throws Exception {
        AppUser user = AppUser.builder()
                .id("appUser-id-1")
                .githubId("1212")
                .createdAt(Instant.parse("2024-06-20T15:10:05.022Z"))
                .build();

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/people")
                        .with(createGithubOAuth2Login(1212))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "firstName": "Chuck",
                                    "lastName": "Norris"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "status": "ACTIVE",
                                "statusUpdatedAt": null,
                                "statusUpdatedBy": null,
                                "firstName": "Chuck",
                                "lastName": "Norris",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "1212",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Person> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Person returnedPerson = apiResponse.getData();

        mockMvc.perform(get("/api/people")
                        .with(createGithubOAuth2Login(1212))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": 1
                            },
                            "data":
                              [
                                {
                                    "status": "ACTIVE",
                                    "statusUpdatedAt": null,
                                    "statusUpdatedBy": null,
                                    "firstName": "Chuck",
                                    "lastName": "Norris",
                                    "createdBy": {
                                        "id": "appUser-id-1",
                                        "githubId": "1212",
                                        "createdAt": "2024-06-20T15:10:05.022Z"
                                    }
                                }
                            ]
                        }
                        """))
                .andExpect(jsonPath("$.data[0].id").value(returnedPerson.id()))
                .andExpect(jsonPath("$.data[0].createdAt").exists());
    }

    @Test
    void getPersonByIdTest_whenNotAuthenticated_thenReturnUnauthorized() throws Exception {
        mockMvc.perform(get("/api/people/1"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }

    @Test
    @DirtiesContext
    void getPersonByIdTest_whenPersonInDatabase_thenReturnPerson() throws Exception {
        AppUser user = AppUser.builder()
                .id("appUser-id-1")
                .githubId("1212")
                .createdAt(Instant.parse("2024-06-20T15:10:05.022Z"))
                .build();

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/people")
                        .with(createGithubOAuth2Login(1212))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "firstName": "Chuck",
                                    "lastName": "Norris"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "status": "ACTIVE",
                                "statusUpdatedAt": null,
                                "statusUpdatedBy": null,
                                "firstName": "Chuck",
                                "lastName": "Norris",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "1212",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Person> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Person returnedPerson = apiResponse.getData();

        mockMvc.perform(get("/api/people/" + returnedPerson.id())
                        .with(createGithubOAuth2Login(1212))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "status": "ACTIVE",
                                "statusUpdatedAt": null,
                                "statusUpdatedBy": null,
                                "firstName": "Chuck",
                                "lastName": "Norris",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "1212",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """));
    }

    @Test
    void getPersonById_whenPersonNotInDatabase_thenReturnNotFound() throws Exception {
        AppUser user = AppUser.builder()
                .id("appUser-id-1")
                .githubId("1212")
                .createdAt(Instant.parse("2024-06-20T15:10:05.022Z"))
                .build();

        userRepository.save(user);

        mockMvc.perform(get("/api/people/non-existing-id")
                        .with(createGithubOAuth2Login(1212))
                )
                .andExpect(status().isNotFound())
                .andExpect(content().string("No person found with ID 'non-existing-id'."));
    }

    @Test
    void createPersonTest_whenNotAuthenticated_thenReturnUnauthorized() throws Exception {
        mockMvc.perform(post("/api/people")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "firstName": "Chuck",
                                    "lastName": "Norris"
                                }
                                """))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }

    @Test
    @DirtiesContext
    void createPersonTest_whenAuthenticated_thenSaveContentInDatabase() throws Exception {
        AppUser user = AppUser.builder()
                .id("appUser-id-1")
                .githubId("1212")
                .createdAt(Instant.parse("2024-06-20T15:10:05.022Z"))
                .build();

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/people")
                        .with(createGithubOAuth2Login(1212))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "firstName": "Chuck",
                                    "lastName": "Norris"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "status": "ACTIVE",
                                "statusUpdatedAt": null,
                                "statusUpdatedBy": null,
                                "firstName": "Chuck",
                                "lastName": "Norris",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "1212",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """))
                .andExpect(jsonPath("$.data.id").exists())
                .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ApiResponse<Person> apiResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });
        Person returnedPerson = apiResponse.getData();

        mockMvc.perform(get("/api/people/" + returnedPerson.id())
                        .with(createGithubOAuth2Login(1212))
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "status": "ACTIVE",
                                "statusUpdatedAt": null,
                                "statusUpdatedBy": null,
                                "firstName": "Chuck",
                                "lastName": "Norris",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "1212",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """));
    }

    @Test
    @DirtiesContext
    void createPersonTest_whenFirstAndLastNameEmptyString_thenReturnBadRequest() throws Exception {
        AppUser user = AppUser.builder()
                .id("appUser-id-1")
                .githubId("1212")
                .createdAt(Instant.parse("2024-06-20T15:10:05.022Z"))
                .build();

        userRepository.save(user);

        mockMvc.perform(post("/api/people")
                        .with(createGithubOAuth2Login(1212))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "firstName": "    ",
                                    "lastName": ""
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(content().json("""
                        {
                             "errors": {
                                 "lastName": "Last name must have at least one non-whitespace character",
                                 "firstName": "First name must have at least one non-whitespace character"
                             }
                         }
                        """));
    }

    @Test
    @DirtiesContext
    void createPersonTest_whenLeadingOrTrailingSpaces_thenTrimString() throws Exception {
        AppUser user = AppUser.builder()
                .id("appUser-id-1")
                .githubId("1212")
                .createdAt(Instant.parse("2024-06-20T15:10:05.022Z"))
                .build();

        userRepository.save(user);

        mockMvc.perform(post("/api/people")
                        .with(createGithubOAuth2Login(1212))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "firstName": "  f  ",
                                    "lastName": "  l   "
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "info": {
                                "count": null
                            },
                            "data": {
                                "status": "ACTIVE",
                                "statusUpdatedBy": null,
                                "statusUpdatedAt": null,
                                "firstName": "f",
                                "lastName": "l",
                                "createdBy": {
                                    "id": "appUser-id-1",
                                    "githubId": "1212",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """));
    }
}