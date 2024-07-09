package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.ContentStatus;
import com.aljoschazoeller.backend.content.domain.UpdateContentDTO;
import com.aljoschazoeller.backend.exceptions.ContentNotFoundException;
import com.aljoschazoeller.backend.exceptions.InvalidContentStatusException;
import com.aljoschazoeller.backend.exceptions.UnauthorizedRequestException;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.Instant;
import java.util.List;

@Service
public class ContentService {
    private static final Logger log = LoggerFactory.getLogger(ContentService.class);
    private final ContentRepository contentRepository;
    private final UserService userService;
    private final MongoTemplate mongoTemplate;


    public ContentService(ContentRepository contentRepository, UserService userService, MongoTemplate mongoTemplate) {
        this.contentRepository = contentRepository;
        this.userService = userService;
        this.mongoTemplate = mongoTemplate;
    }

    public List<Content> getAllActiveContent() {
        return contentRepository.findContentByStatus(ContentStatus.ACTIVE);
    }

    public Content getContentById(String id) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Could not find content with ID '{}'", id);
                    return new ContentNotFoundException("No content found with ID '" + id + "'.");
                });
        log.info("Successfully found content with ID '{}‘", id);
        return content;
    }

    public Content createContent(Content content) {
        if (content.id() != null) {
            log.error("ID '{}' must be NULL in order to create new content.", content.id());
            throw new IllegalArgumentException("ID must be NULL in order to create new content.");
        }
        return contentRepository.insert(content);
    }

    public Content updateContentById(String id, UpdateContentDTO updates, Principal principal) {
        Instant currentTime = Instant.now();

        if (principal == null) {
            throw new UnauthorizedRequestException("Unauthorized request. Authentication is required in order to update content.");
        }

        Content oldContent = this.getContentById(id);

        if (oldContent.status() != ContentStatus.ACTIVE) {
            log.error("Content with ID '{}‘ is currently not active and can not be updated.", id);
            throw new InvalidContentStatusException("Content with ID '" + id + "' is currently not active and can not be updated.");
        }

        String githubId = principal.getName();
        AppUser appUser = userService.findByGithubId(githubId);

        Update update = new Update().set("lastUpdatedAt", currentTime).set("lastUpdatedBy", appUser);

        updates.getAsMap().forEach((field, value) -> {
            if (value != null) {
                if (value instanceof String string) {
                    value = string.trim();
                }
                update.set(field, value);
            }
        });

        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));

        mongoTemplate.updateFirst(query, update, Content.class);
        Content savedContent = mongoTemplate.findOne(query, Content.class);

        log.info("Updated content with ID '{}'", id);
        return savedContent;
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

        log.info("Soft deleted content with ID '{}'", id);
    }
}
