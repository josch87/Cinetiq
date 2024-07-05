package com.aljoschazoeller.backend.user.githubsync;

import com.aljoschazoeller.backend.auth.GithubMapper;
import com.aljoschazoeller.backend.auth.GithubService;
import com.aljoschazoeller.backend.exceptions.GithubProfileNotFoundException;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import com.aljoschazoeller.backend.user.domain.GithubUserProfile;
import com.aljoschazoeller.backend.user.domain.GithubUserProfileSyncStatus;
import com.aljoschazoeller.backend.user.githubsync.domain.StartedBySystem;
import com.aljoschazoeller.backend.user.githubsync.domain.GithubSyncLog;
import com.aljoschazoeller.backend.user.githubsync.domain.SyncedGithubProfilesDTO;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class GithubSyncService {

    private final UserService userService;
    private final GithubService githubService;
    private final GithubSyncRepository githubSyncRepository;

    public GithubSyncService(UserService userService, GithubService githubService, GithubSyncRepository githubSyncRepository) {
        this.userService = userService;
        this.githubService = githubService;
        this.githubSyncRepository = githubSyncRepository;
    }

    public AppUser syncGithubUserProfile(OAuth2User user) {
        Instant currentTime = Instant.now();

        AppUser appUser = userService.findByGithubId(user.getAttributes().get("id").toString());
        GithubUserProfile oAuth2UserGithubProfile = GithubMapper.mapOAuth2UserToGithubUserProfile(user);

        updateGithubUserProfile(appUser, currentTime, oAuth2UserGithubProfile);
        return userService.findByGithubId(appUser.githubId());
    }

    public GithubUserProfileSyncStatus syncGithubUserProfile(AppUser appUser) {
        Instant currentTime = Instant.now();

        Integer githubId = Integer.valueOf(appUser.githubId());
        try {
            GithubUserProfile userProfile = githubService.getUserProfile(githubId);
            return updateGithubUserProfile(appUser, currentTime, userProfile);

        } catch (GithubProfileNotFoundException exception) {
            this.setGithubUserProfileInactive(appUser);
            return GithubUserProfileSyncStatus.NOT_FOUND;
        }
    }

    private AppUser setGithubUserProfileInactive(AppUser appUser) {
        assert userService.checkIfUserExistsById(appUser.id());

        AppUser appUserToSave = appUser.withGithubUserProfileActive(false);

        return userService.updateUser(appUserToSave);
    }

    public SyncedGithubProfilesDTO syncGithubUserProfiles(StartedBySystem system, AppUser startedBy) {
        Instant startedAt = Instant.now();
        List<AppUser> appUsers = userService.getAllUsers();

        AtomicInteger updated = new AtomicInteger();
        AtomicInteger notUpdated = new AtomicInteger();
        AtomicInteger notFound = new AtomicInteger();

        appUsers.forEach(appUser -> {
            GithubUserProfileSyncStatus syncStatus = this.syncGithubUserProfile(appUser);
            switch (syncStatus) {
                case UPDATED -> updated.getAndIncrement();
                case NOT_UPDATED -> notUpdated.getAndIncrement();
                case NOT_FOUND -> notFound.getAndIncrement();
            }
        });

        SyncedGithubProfilesDTO result = new SyncedGithubProfilesDTO(
                appUsers.size(),
                updated.get(),
                notUpdated.get(),
                notFound.get()
        );

        this.logGithubUserProfileSync(system, startedBy, startedAt, result);
        return result;
    }

    private GithubUserProfileSyncStatus updateGithubUserProfile(AppUser appUser, Instant currentTime, GithubUserProfile currentGithubUserProfile) {
        assert userService.checkIfUserExistsById(appUser.id());

        AppUser updatedAppUser;
        GithubUserProfileSyncStatus returnValue;
        boolean isGithubUpdatedSinceLastSync = currentGithubUserProfile.updated_at().isAfter(appUser.githubUserProfileSynced().updated_at());

        if (isGithubUpdatedSinceLastSync) {
            updatedAppUser = appUser
                    .withGithubUserProfileSynced(currentGithubUserProfile)
                    .withGithubUserProfileSyncedAt(currentTime)
                    .withGithubUserProfileUpdatedAt(currentTime);
            returnValue = GithubUserProfileSyncStatus.UPDATED;
        } else {
            updatedAppUser = appUser
                    .withGithubUserProfileSyncedAt(currentTime);
            returnValue = GithubUserProfileSyncStatus.NOT_UPDATED;
        }

        userService.updateUser(updatedAppUser);
        return returnValue;
    }

    private GithubSyncLog logGithubUserProfileSync(StartedBySystem startedBySystem, AppUser startedBy, Instant startedAt, SyncedGithubProfilesDTO result) {
        GithubSyncLog log = new GithubSyncLog(
                null,
                startedBySystem,
                startedBy,
                startedAt,
                Instant.now(),
                result
        );
        return githubSyncRepository.insert(log);
    }
}
