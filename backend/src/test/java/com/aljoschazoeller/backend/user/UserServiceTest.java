package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.exceptions.UserNotFoundException;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.Instant;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private final UserRepository mockUserRepository = mock(UserRepository.class);
    private final UserService userService = new UserService(mockUserRepository);

    @Test
    void getAllUsersTest_whenNoUser_thenReturnEmptyList() {
        //GIVEN

        //WHEN
        List<AppUser> actual = userService.getAllUsers();

        //THEN
        assertEquals(Collections.emptyList(), actual);
    }
    
    @Test
    void getAllUsersTest_whenOneUser_thenReturnListOfOne() {
        //GIVEN
        AppUser user = AppUser.builder()
                .id("1")
                .build();

        when(mockUserRepository.findAll()).thenReturn(Collections.singletonList(user));

        //WHEN
        List<AppUser> actual = userService.getAllUsers();

        //THEN
        assertEquals(Collections.singletonList(user), actual);
    }

    @Test
    void getAppUserById_whenNoUserFound_thenThrowUserNotFoundException() {
        when(mockUserRepository.findById("1")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.getAppUserById("1"));
        verify(mockUserRepository, times(1)).findById("1");
    }

    @Test
    void getAppUserById_whenUserFound_thenReturnUser() {
        //GIVEN
        AppUser appUser = AppUser.builder()
                .id("appUser-id-1")
                .githubId("1")
                .build();

        when(mockUserRepository.findById("appUser-id-1")).thenReturn(Optional.of(appUser));

        //WHEN
        AppUser actual = userService.getAppUserById("appUser-id-1");

        //THEN
        assertEquals(appUser, actual);
        verify(mockUserRepository, times(1)).findById("appUser-id-1");
    }

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
        AppUser expected = AppUser.builder()
                .id("appUser-id-1212")
                .githubId("github-id-1111")
                .createdAt(Instant.now())
                .githubUserProfileOnSignUp(githubUserProfile)
                .build();

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
        Instant mockedTime = Instant.parse("2024-06-29T13:51:12.235Z");
        OAuth2User oAuth2User = mock(OAuth2User.class);
        Map<String, Object> githubUserProfile = new HashMap<>();
        githubUserProfile.put("id", 1111);
        githubUserProfile.put("login", "github-username-abc");
        githubUserProfile.put("avatar_url", "github-avatar-url");
        githubUserProfile.put("url", "github-url");
        githubUserProfile.put("html_url", "github-html-url");
        githubUserProfile.put("created_at", "2024-06-02T12:14:18Z");
        githubUserProfile.put("updated_at", "2024-06-30T16:46:24Z");
        when(oAuth2User.getAttributes()).thenReturn(githubUserProfile);

        AppUser expected = AppUser.builder()
                .id("appUser-id-1212")
                .githubId("1111")
                .createdAt(mockedTime)
                .build();
        when(mockUserRepository.save(any(AppUser.class))).thenReturn(expected);

        //WHEN
        AppUser actual = userService.register(oAuth2User, mockedTime);

        //THEN
        verify(mockUserRepository, times(1)).save(any(AppUser.class));
        assertEquals(expected, actual);
    }
}