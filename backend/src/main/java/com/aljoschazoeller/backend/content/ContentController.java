package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.NewContentDTO;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    private final ContentService contentService;
    private final UserService userService;

    public ContentController(ContentService contentService, UserService userService) {
        this.contentService = contentService;
        this.userService = userService;
    }

    @GetMapping
    public ApiResponse<List<Content>> getContent() {
        List<Content> content = contentService.getAllContent();
        return new ApiResponse<>(content);
    }

    @PostMapping
    public Content createContent(Principal principal, @RequestBody NewContentDTO body) {
        Instant currentTime = Instant.now();
        String githubId = principal.getName();
        AppUser appUser = userService.findByGithubId(githubId);

        Content contentToSave = new Content(null, body.titles(), appUser, currentTime);
        return contentService.createContent(contentToSave);
    }
}
