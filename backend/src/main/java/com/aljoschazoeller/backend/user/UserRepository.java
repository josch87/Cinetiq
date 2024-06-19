package com.aljoschazoeller.backend.user;

import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<AppUser, String> {

    public Optional<AppUser> findAppUserByGithubId(String githubId);
}
