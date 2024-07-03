package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.user.domain.AppUser;
import com.aljoschazoeller.backend.user.domain.SyncedGithubProfilesDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

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
    public SyncedGithubProfilesDTO syncGithubUserProfiles() {
        return userService.syncGithubUserProfiles();
    }
}
