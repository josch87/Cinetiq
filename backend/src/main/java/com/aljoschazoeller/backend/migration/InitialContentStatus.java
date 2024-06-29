package com.aljoschazoeller.backend.migration;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.ContentStatus;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.mongodb.core.MongoTemplate;

@ChangeUnit(id = "initial-contentstatus", order = "1", author = "Aljoscha Zöller")
public class InitialContentStatus {

    private final MongoTemplate mongoTemplate;

    public InitialContentStatus(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Execution
    public void execution() {
        mongoTemplate.findAll(Content.class)
                .stream()
                .filter((content -> content.status() == null))
                .map(content -> content.withStatus(ContentStatus.ACTIVE))
                .forEach(mongoTemplate::save);
    }

    @RollbackExecution
    public void rollbackExecution() {
        mongoTemplate.findAll(Content.class)
                .stream()
                .filter((content -> content.status() == ContentStatus.ACTIVE))
                .map(content -> content.withStatus(null))
                .forEach(mongoTemplate::save);
    }
}
