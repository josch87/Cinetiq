package com.aljoschazoeller.backend.testutil;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.OAuth2LoginRequestPostProcessor;

import java.util.Collections;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;

public class GithubOAuth2LoginTestHelper {

    public static OAuth2LoginRequestPostProcessor createGithubOAuth2Login(int id) {
        return oauth2Login()
                .oauth2User(new DefaultOAuth2User(
                        AuthorityUtils.createAuthorityList("OAUTH2_USER"),
                        Collections.singletonMap("id", id),
                        "id")
                );
    }
}
