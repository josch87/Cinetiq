package com.aljoschazoeller.backend.migration;

import com.aljoschazoeller.backend.loginlog.domain.LoginLog;
import com.aljoschazoeller.backend.user.domain.AppUser;
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
    private Map<String, Instant> originalDates;

    private static final String CREATED_AT = "created_at";

    public SyncRegistrationAndLoginTime(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
        this.originalDates = new HashMap<>();
    }

    @Execution
    public void execution() {
        List<AppUser> appUsers = mongoTemplate.findAll(AppUser.class);

        for (AppUser appUser : appUsers) {
            Query query = new Query(Criteria.where("appUser._id")
                    .is(appUser.id()))
                    .with(Sort.by(Sort.Direction.ASC, CREATED_AT))
                    .limit(1);
            LoginLog loginLog = mongoTemplate.findOne(query, LoginLog.class);

            if (loginLog != null) {
                originalDates.put(loginLog.id(), loginLog.createdAt());
                LoginLog updatedLog = new LoginLog(
                        loginLog.id(),
                        loginLog.appUser(),
                        appUser.createdAt(),
                        loginLog.ipAddress(),
                        loginLog.userAgent()
                );
                FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true);

                mongoTemplate.findAndModify(query, new Update().set(CREATED_AT, updatedLog.createdAt()),
                        options, LoginLog.class);
            }
        }
    }

    @RollbackExecution
    public void rollbackExecution() {
        for (Map.Entry<String, Instant> entry : originalDates.entrySet()) {
            Query query = new Query(Criteria.where("_id").is(entry.getKey()));
            Update update = Update.update(CREATED_AT, entry.getValue());
            mongoTemplate.updateFirst(query, update, LoginLog.class);
        }
    }
}
