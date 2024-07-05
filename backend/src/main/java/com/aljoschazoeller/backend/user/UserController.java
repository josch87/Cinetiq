package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.user.domain.AppUser;
import com.aljoschazoeller.backend.user.githubsync.GithubSyncService;
import com.aljoschazoeller.backend.user.githubsync.domain.StartedBySystem;
import com.aljoschazoeller.backend.user.githubsync.domain.SyncedGithubProfilesDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final GithubSyncService githubSyncService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<List<AppUser>> getAllUsers() {
        List<AppUser> appUsers = userService.getAllUsers();
        return new ApiResponse<>(appUsers);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<AppUser> getAppUserById(@PathVariable String id) {
        AppUser appUser = userService.getAppUserById(id);
        return new ApiResponse<>(appUser);
    }

    @PostMapping("/sync-github-profiles")
    @ResponseStatus(HttpStatus.OK)
    public SyncedGithubProfilesDTO syncGithubUserProfiles(Principal principal) {
        AppUser appUser = userService.findByGithubId(principal.getName());
        return githubSyncService.syncGithubUserProfiles(StartedBySystem.API_CALL, appUser);
    }
}
