package com.aljoschazoeller.backend.migration;

import com.mongodb.BasicDBObject;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.time.Instant;
import java.util.Date;

@SuppressWarnings("unused")
@ChangeUnit(id = "introduce-githubuserprofile-sync", order = "3", author = "Aljoscha Zöller")
public class IntroduceGithubUserProfileSync {

    private final MongoTemplate mongoTemplate;

    public IntroduceGithubUserProfileSync(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Execution
    public void execution() {
        Query query = new Query();

        BasicDBObject githubUserProfile = new BasicDBObject();
        Instant instant = Instant.parse("1970-01-01T12:00:00.123Z");
        githubUserProfile.put("updated_at", Date.from(instant));

        Update update = new Update()
                .rename("githubUserProfile", "githubUserProfileOnSignUp")
                .set("githubUserProfileSynced", githubUserProfile)
                .set("githubUserProfileActive", true)
                .set("status", "ACTIVE");

        mongoTemplate.updateMulti(query, update, BasicDBObject.class, "appUsers");
    }

    @RollbackExecution
    public void rollbackExecution() {
        Query query = new Query();
        Update update = new Update()
                .rename("githubUserProfileOnSignUp", "githubUserProfile")
                .unset("githubUserProfileSynced")
                .unset("githubUserProfileActive")
                .unset("status");
        mongoTemplate.updateMulti(query, update, BasicDBObject.class, "appUsers");
    }
}
