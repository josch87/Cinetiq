package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.user.domain.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ApiResponse<List<AppUser>> getAllUsers() {
        List<AppUser> appUsers = userService.getAllUsers();
        return new ApiResponse<>(appUsers);
    }

    @PostMapping("/sync-github-profiles")
    public String syncGithubUserProfiles() {
        userService.syncGithubUserProfiles();
        return "Synced";
    }
}
