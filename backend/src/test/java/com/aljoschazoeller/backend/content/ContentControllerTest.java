package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.user.UserRepository;
import com.aljoschazoeller.backend.user.domain.AppUser;
import com.fasterxml.jackson.databind.ObjectMapper;
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
                Instant.parse("2024-06-20T15:10:05.00Z"));

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
        Content content = objectMapper.readValue(result.getResponse().getContentAsString(), Content.class);

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
                                        "id": "user",
                                    }
                                }
                            ]
                        }
                        """))
                .andExpect(jsonPath("$.data[0].id").value(content.id()));
    }

    @Test
    void createContent() {
    }
}