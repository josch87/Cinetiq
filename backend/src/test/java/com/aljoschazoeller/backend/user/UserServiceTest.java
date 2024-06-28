package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.exceptions.UserNotFoundException;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private final UserRepository mockUserRepository = mock(UserRepository.class);
    private final UserService userService = new UserService(mockUserRepository);

    @Test
    void findByGithubIdTest_whenIdNotFound_thenThrowException() {
        //GIVEN

        //WHEN

        //THEN
        Exception exception = assertThrows(UserNotFoundException.class, () -> userService.findByGithubId("nonexistentId"));
        assertEquals("No appUser found with GitHub ID 'nonexistentId'", exception.getMessage());
        verify(mockUserRepository, times(1)).findAppUserByGithubId("nonexistentId");
    }

    @Test
    void findByGithubIdTest_whenIdFound_thenReturnAppUser() {
        //GIVEN
        Map<String, Object> githubUserProfile = new HashMap<>();
        githubUserProfile.put("id", "github-id-1111");
        AppUser expected = new AppUser("appUser-id-1212", "github-id-1111", githubUserProfile, Instant.now());
        when(mockUserRepository.findAppUserByGithubId("github-id-1111")).thenReturn(Optional.of(expected));

        //WHEN
        AppUser actual = userService.findByGithubId("github-id-1111");

        //THEN
        verify(mockUserRepository, times(1)).findAppUserByGithubId("github-id-1111");
        assertEquals(expected, actual);
    }

    @Test
    void registerTest_whenOAuth2User_thenReturnAppUser() {
        //GIVEN
        Instant currentTime = Instant.now();

        OAuth2User oAuth2User = mock(OAuth2User.class);
        Map<String, Object> githubUserProfile = new HashMap<>();
        githubUserProfile.put("id", "github-id-1111");
        when(oAuth2User.getAttributes()).thenReturn(githubUserProfile);

        AppUser expected = new AppUser("appUser-id-1212", "github-id-1111", githubUserProfile, currentTime);
        when(mockUserRepository.save(any(AppUser.class))).thenReturn(expected);

        //WHEN
        AppUser actual = userService.register(oAuth2User);

        //THEN
        verify(mockUserRepository, times(1)).save(any(AppUser.class));

        assertEquals(expected.id(), actual.id());
        assertEquals(expected.githubId(), actual.githubId());
        assertEquals(expected.githubUserProfile(), actual.githubUserProfile());
    }
}