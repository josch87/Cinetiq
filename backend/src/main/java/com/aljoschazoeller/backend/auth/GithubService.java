package com.aljoschazoeller.backend.auth;

import com.aljoschazoeller.backend.exceptions.GithubProfileNotFoundException;
import com.aljoschazoeller.backend.user.domain.GithubUserProfile;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GithubService {
    private final RestClient restClient;

    public GithubService(@Value("${https://api.github.com}") String url) {
        this.restClient = RestClient.create(url);
    }

    public GithubUserProfile getUserProfile(Integer githubId) throws GithubProfileNotFoundException {
        return this.restClient
                .get()
                .uri("/user/{githubId}", githubId)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, ((_, response) -> {
                    throw new GithubProfileNotFoundException(response.getStatusCode(), response.getBody().toString());
                }))
                .body(GithubUserProfile.class);
    }
}
