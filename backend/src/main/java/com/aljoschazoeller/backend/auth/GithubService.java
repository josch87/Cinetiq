package com.aljoschazoeller.backend.auth;

import com.aljoschazoeller.backend.user.domain.GithubUserProfile;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GithubService {
    private final RestClient restClient;

    public GithubService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.baseUrl("https://api.github.com").build();
    }

    public GithubUserProfile getUserProfile(Integer githubId) {
        GithubUserProfile response = this.restClient
                .get()
                .uri("/user/{githubId}", githubId)
                .retrieve()
                .body(GithubUserProfile.class);
        assert response != null;
        return response;

    }
}
