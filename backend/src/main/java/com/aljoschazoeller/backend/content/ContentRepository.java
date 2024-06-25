package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.ContentStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepository extends MongoRepository<Content, String> {

    List<Content> findContentByStatus(ContentStatus status);
}
