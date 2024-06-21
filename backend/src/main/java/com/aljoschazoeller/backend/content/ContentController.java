package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.NewContentDTO;
import com.aljoschazoeller.backend.exceptions.UnauthorizedRequestException;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
    public Content createContent(Principal principal, @RequestBody NewContentDTO body) {
        Instant currentTime = Instant.now();

        if (principal == null) {
            throw new UnauthorizedRequestException("Unauthorized request. Authentication is required in order to create new content.");
        }

        String githubId = principal.getName();
        AppUser appUser = userService.findByGithubId(githubId);

        Content contentToSave = new Content(
                null,
                body.contentType(),
                body.originalTitle(),
                body.englishTitle(),
                body.germanTitle(),
                appUser,
                currentTime);
        return contentService.createContent(contentToSave);
    }
}
