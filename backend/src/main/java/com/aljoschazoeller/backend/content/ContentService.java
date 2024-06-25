package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.ContentStatus;
import com.aljoschazoeller.backend.exceptions.ContentNotFoundException;
import com.aljoschazoeller.backend.exceptions.UnauthorizedRequestException;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.Instant;
import java.util.List;

@Service
public class ContentService {
    private final ContentRepository contentRepository;
    private final UserService userService;

    public ContentService(ContentRepository contentRepository, UserService userService) {
        this.contentRepository = contentRepository;
        this.userService = userService;
    }

    public List<Content> getAllActiveContent() {
        return contentRepository.findContentByStatus(ContentStatus.ACTIVE);
    }

    public Content getContentById(String id) {
        return contentRepository.findById(id)
                .orElseThrow(() -> new ContentNotFoundException("No content found with ID " + id));
    }

    public Content createContent(Content content) {
        return contentRepository.save(content);
    }

    public void softDeleteContentById(String id, Principal principal) {
        Instant currentTime = Instant.now();

        if (principal == null) {
            throw new UnauthorizedRequestException("Unauthorized request. Authentication is required in order to delete content.");
        }

        String githubId = principal.getName();
        AppUser appUser = userService.findByGithubId(githubId);

        Content content = this.getContentById(id);

        Content contentToUpdate = content
                .withStatus(ContentStatus.DELETED)
                .withStatusUpdatedAt(currentTime)
                .withStatusUpdatedBy(appUser);

        contentRepository.save(contentToUpdate);
    }
}
