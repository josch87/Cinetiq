package com.aljoschazoeller.backend.migration;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unused")
@ChangeUnit(id = "sync-registration-and-login-time", order = "2", author = "Aljoscha Zöller")
public class SyncRegistrationAndLoginTime {

    private final MongoTemplate mongoTemplate;
    private final Map<String, Instant> originalDates;

    private static final String CREATED_AT = "created_at";
    private static final String LOGIN_LOGS = "loginLogs";

    public SyncRegistrationAndLoginTime(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
        this.originalDates = new HashMap<>();
    }

    @Execution
    public void execution() {
        List<BasicDBObject> appUsers = mongoTemplate.findAll(BasicDBObject.class, "appUsers");

        for (BasicDBObject appUser : appUsers) {
            Query query = new Query(Criteria.where("appUser._id")
                    .is(appUser.get("_id")))
                    .with(Sort.by(Sort.Direction.ASC, CREATED_AT))
                    .limit(1);
            BasicDBObject loginLog = mongoTemplate.findOne(query, BasicDBObject.class, LOGIN_LOGS);

            if (loginLog != null) {
                originalDates.put(loginLog.getString("_id"), (Instant)loginLog.get(CREATED_AT));
                BasicDBObject updatedLog = new BasicDBObject(loginLog);
                updatedLog.put(CREATED_AT, appUser.get(CREATED_AT));

                FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true);

                mongoTemplate.findAndModify(query, new Update().set(CREATED_AT, updatedLog.get(CREATED_AT)),
                        options, BasicDBList.class, LOGIN_LOGS);
            }
        }
    }

    @RollbackExecution
    public void rollbackExecution() {
        for (Map.Entry<String, Instant> entry : originalDates.entrySet()) {
            Query query = new Query(Criteria.where("_id").is(entry.getKey()));
            Update update = Update.update(CREATED_AT, entry.getValue());
            mongoTemplate.updateFirst(query, update, BasicDBObject.class, LOGIN_LOGS);
        }
    }
}
