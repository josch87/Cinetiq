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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.Instant;

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
    void createPersonTest_whenNotAuthenticated_thenReturnUnauthorized() throws Exception{
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
    @WithMockUser
    @DirtiesContext
    void createPersonTest_whenAuthenticated_thenSaveContentInDatabase() throws Exception {
        AppUser user = AppUser.builder()
                .id("appUser-id-1")
                .githubId("user")
                .createdAt(Instant.parse("2024-06-20T15:10:05.022Z"))
                .build();

        userRepository.save(user);

        MvcResult result = mockMvc.perform(post("/api/people")
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
                                    "githubId": "user",
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

        mockMvc.perform(get("/api/people/" + returnedPerson.id()))
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
                                    "githubId": "user",
                                    "createdAt": "2024-06-20T15:10:05.022Z"
                                }
                            }
                        }
                        """));

    }
}