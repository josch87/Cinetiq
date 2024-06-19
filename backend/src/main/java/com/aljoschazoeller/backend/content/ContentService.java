package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {
    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }
}
