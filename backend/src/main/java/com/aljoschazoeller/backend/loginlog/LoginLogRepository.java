package com.aljoschazoeller.backend.loginlog;

import com.aljoschazoeller.backend.loginlog.domain.LoginLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginLogRepository extends MongoRepository<LoginLog, String> {
}
