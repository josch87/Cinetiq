package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.api.ResponseInfo;
import com.aljoschazoeller.backend.content.domain.Content;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public ApiResponse<List<Content>> getContent() {
        List<Content> content = contentService.getAllContent();
        ResponseInfo responseInfo = new ResponseInfo(content.size());

        return new ApiResponse<>(responseInfo, content);
    }
}
