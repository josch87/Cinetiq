package com.aljoschazoeller.backend.user.githubsync;

import com.aljoschazoeller.backend.user.githubsync.domain.GithubSyncLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GithubSyncRepository extends MongoRepository<GithubSyncLog, String> {
}
