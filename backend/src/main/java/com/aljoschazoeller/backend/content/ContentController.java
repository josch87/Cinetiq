package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.NewContentDTO;
import com.aljoschazoeller.backend.content.domain.UpdateContentDTO;
import com.aljoschazoeller.backend.exceptions.UnauthorizedRequestException;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;
    private final UserService userService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<List<Content>> getContent() {
        List<Content> content = contentService.getAllActiveContent();
        return new ApiResponse<>(content);
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<Content> getContentById(@PathVariable String id) {
        Content content = contentService.getContentById(id);
        return new ApiResponse<>(content);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<Content> createContent(Principal principal, @Valid @RequestBody NewContentDTO body) {
        Instant currentTime = Instant.now();

        if (principal == null) {
            throw new UnauthorizedRequestException("Unauthorized request. Authentication is required in order to create new content.");
        }

        String githubId = principal.getName();
        AppUser appUser = userService.findByGithubId(githubId);

        Content contentToSave = new Content(
                null,
                body.getContentTypeAsEnum(),
                body.originalTitle().trim(),
                body.englishTitle().trim(),
                body.germanTitle().trim(),
                appUser,
                currentTime);
        Content savedContent =  contentService.createContent(contentToSave);
        return new ApiResponse<>(savedContent);
    }

    @PatchMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<Content> updateContentById(Principal principal, @PathVariable String id, @Valid @RequestBody UpdateContentDTO updates) {
        Content content =  contentService.updateContentById(id, updates, principal);
        return new ApiResponse<>(content);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void softDeleteContentById(Principal principal, @PathVariable String id) {
        contentService.softDeleteContentById(id, principal);
    }
}
