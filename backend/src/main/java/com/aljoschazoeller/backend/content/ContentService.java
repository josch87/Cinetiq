package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.exceptions.ContentNotFoundException;
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

    public Content getContentById(String id) {
        return contentRepository.findById(id)
                .orElseThrow(() -> new ContentNotFoundException("No content found with ID " + id));
    }

    public Content createContent(Content content) {
        return contentRepository.save(content);
    }
}
