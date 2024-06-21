package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepository extends MongoRepository<Content, String> {
}
