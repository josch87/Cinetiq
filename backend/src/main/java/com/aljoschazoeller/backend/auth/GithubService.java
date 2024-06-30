package com.aljoschazoeller.backend.auth;

import com.aljoschazoeller.backend.user.domain.GithubUserProfile;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Optional;

@Service
public class GithubService {
    private final RestClient restClient;

    public GithubService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.baseUrl("https://api.github.com").build();
    }

    public Optional<GithubUserProfile> getUserProfile(Integer githubId) {
        ObjectMapper objectMapper = new ObjectMapper();


        ResponseEntity<String> response = this.restClient
                .get()
                .uri("/user/{githubId}", githubId)
                .retrieve()
                .toEntity(String.class);

        System.out.println("Response Status Code: " + response.getStatusCode());

        if (response.getStatusCode().is2xxSuccessful()) {
            try {
                GithubUserProfile profile = objectMapper.readValue(response.getBody(), GithubUserProfile.class);
                return Optional.of(profile);
            } catch (JsonProcessingException exception) {
                System.out.println(exception.getMessage());
            }
        }
            return Optional.empty();
    }
}
