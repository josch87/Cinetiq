package com.aljoschazoeller.backend.user.githubsync;

import com.aljoschazoeller.backend.auth.GithubService;
import com.aljoschazoeller.backend.exceptions.GithubProfileNotFoundException;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import com.aljoschazoeller.backend.user.domain.GithubUserProfile;
import com.aljoschazoeller.backend.user.domain.GithubUserProfileSyncStatus;
import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

class GithubSyncServiceTest {

    private final GithubSyncRepository mockGithubSyncRepository = mock(GithubSyncRepository.class);
    private final GithubService mockGithubService = mock(GithubService.class);
    private final UserService mockUserService = mock(UserService.class);
    private final GithubSyncService githubSyncService = new GithubSyncService(mockUserService, mockGithubService, mockGithubSyncRepository);


    @Test
    void syncGithubUserProfileTest_whenNoGithubProfileFound_thenReturnNotFoundStatus() {
        //GIVEN
        AppUser user = AppUser.builder()
                .id("1")
                .githubId("1")
                .githubUserProfileActive(true)
                .build();

        when(mockGithubService.getUserProfile(1)).thenThrow(GithubProfileNotFoundException.class);
        when(mockUserService.checkIfUserExistsById("1")).thenReturn(true);
        GithubUserProfileSyncStatus expected = GithubUserProfileSyncStatus.NOT_FOUND;

        //WHEN
        GithubUserProfileSyncStatus actual = githubSyncService.syncGithubUserProfile(user);

        //THEN
        verify(mockGithubService, times(1)).getUserProfile(1);
        verify(mockUserService, times(1)).checkIfUserExistsById("1");
        assertEquals(expected, actual);
    }

    @Test
    void syncGithubUserProfileTest_whenNoChangesOnGithubSinceLastSync_thenReturnNotUpdated() {
        //GIVEN
        GithubUserProfile githubUserProfile = new GithubUserProfile(
                "username",
                1,
                "avatarUrl",
                "url",
                "htmlUrl",
                "name",
                "company",
                "blog",
                "location",
                "email",
                "bio",
                Instant.parse("2024-07-02T12:17:23.235Z"),
                Instant.parse("2024-07-01T10:17:23.235Z")
        );
        AppUser user = AppUser.builder()
                .id("1")
                .githubId("1")
                .githubUserProfileActive(true)
                .githubUserProfileSynced(githubUserProfile)
                .build();

        when(mockGithubService.getUserProfile(1)).thenReturn(githubUserProfile);
        when(mockUserService.checkIfUserExistsById("1")).thenReturn(true);
        GithubUserProfileSyncStatus expected = GithubUserProfileSyncStatus.NOT_UPDATED;

        //WHEN
        GithubUserProfileSyncStatus actual = githubSyncService.syncGithubUserProfile(user);

        //THEN
        verify(mockGithubService, times(1)).getUserProfile(1);
        verify(mockUserService, times(1)).checkIfUserExistsById("1");
        assertEquals(expected, actual);
    }

    @Test
    void syncGithubUserProfileTest_whenChangesOnGithubSinceLastSync_thenReturnUpdated() {
        //GIVEN
        GithubUserProfile savedGithubUserProfile = new GithubUserProfile(
                "username",
                1,
                "avatarUrl",
                "url",
                "htmlUrl",
                "name",
                "company",
                "blog",
                "location",
                "email",
                "bio",
                Instant.parse("2024-07-01T10:17:23.235Z"),
                Instant.parse("2024-07-01T10:17:23.235Z")
        );
        AppUser user = AppUser.builder()
                .id("1")
                .githubId("1")
                .githubUserProfileActive(true)
                .githubUserProfileSynced(savedGithubUserProfile)
                .build();
        GithubUserProfile currentGithubUserProfile = new GithubUserProfile(
                "username",
                1,
                "avatarUrl2",
                "url2",
                "htmlUrl2",
                "name2",
                "company2",
                "blog2",
                "location2",
                "email2",
                "bio2",
                Instant.parse("2024-07-01T10:17:23.235Z"),
                Instant.parse("2024-07-02T08:15:10.129Z")
        );

        when(mockGithubService.getUserProfile(1)).thenReturn(currentGithubUserProfile);
        when(mockUserService.checkIfUserExistsById("1")).thenReturn(true);
        GithubUserProfileSyncStatus expected = GithubUserProfileSyncStatus.UPDATED;

        //WHEN
        GithubUserProfileSyncStatus actual = githubSyncService.syncGithubUserProfile(user);

        //THEN
        verify(mockGithubService, times(1)).getUserProfile(1);
        verify(mockUserService, times(1)).checkIfUserExistsById("1");
        assertEquals(expected, actual);
    }
}