package com.aljoschazoeller.backend.person;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PersonControllerTest {

    @Autowired
    private MockMvc mockMvc;

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
}