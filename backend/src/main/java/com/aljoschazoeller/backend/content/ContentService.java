package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.ContentStatus;
import com.aljoschazoeller.backend.exceptions.ContentNotFoundException;
import com.aljoschazoeller.backend.exceptions.InvalidContentStatusException;
import com.aljoschazoeller.backend.exceptions.NotAllowedUpdateFieldsException;
import com.aljoschazoeller.backend.exceptions.UnauthorizedRequestException;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ContentService {
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
        return contentRepository.findById(id)
                .orElseThrow(() -> new ContentNotFoundException("No content found with ID '" + id + "'."));
    }

    public Content createContent(Content content) {
        return contentRepository.save(content);
    }


    public Content updateContentById(String id, Map<String, Object> updates, Principal principal) {
        Instant currentTime = Instant.now();

        if (principal == null) {
            throw new UnauthorizedRequestException("Unauthorized request. Authentication is required in order to update content.");
        }

        Content oldContent = this.getContentById(id);

        if (oldContent.status() != ContentStatus.ACTIVE) {
            throw new InvalidContentStatusException("Content with ID '" + id + "' is currently not active and can not be updated.");
        }

        String githubId = principal.getName();
        AppUser appUser = userService.findByGithubId(githubId);

        Update update = new Update().set("lastUpdatedAt", currentTime).set("lastUpdatedBy", appUser);

        List<String> allowedFields = List.of("originalTitle", "englishTitle", "germanTitle");
        List<String> notAllowedUpdates = new ArrayList<>();

        updates.forEach((field, value) -> {
            if (allowedFields.contains(field)) {
                if (value instanceof  String string) {
                    value = string.trim();
                }
                update.set(field, value);
            } else {
                notAllowedUpdates.add(field);
            }
        });

        if (!notAllowedUpdates.isEmpty()) {
            throw new NotAllowedUpdateFieldsException(notAllowedUpdates);
        }

        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));

        mongoTemplate.updateFirst(query, update, Content.class);
        return mongoTemplate.findOne(query, Content.class);
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
