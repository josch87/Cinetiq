package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.ContentType;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ContentServiceTest {

    private final ContentRepository mockContentRepository = mock(ContentRepository.class);
    private final ContentService contentService = new ContentService(mockContentRepository) {
    };

    @Test
    void getAllContentTest_whenNoContentInDatabase_thenReturnEmptyList() {
        //GIVEN

        //WHEN
        List<Content> actual = contentService.getAllContent();

        //THEN
        assertTrue(actual.isEmpty());
    }

    @Test
    void getAllContentTest_whenOneContentInDatabase_thenReturnListWithOne() {
        //GIVEN
        Content expected = new Content(
                "content-id-1",
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                new AppUser("appUser-id-1","github-id-1", null, null),
                Instant.now()
        );
        when(mockContentRepository.findAll()).thenReturn(Collections.singletonList(expected));

        //WHEN
        List<Content> actual = contentService.getAllContent();

        //THEN
        verify(mockContentRepository).findAll();
        assertEquals(Collections.singletonList(expected), actual);
    }



    @Test
    void createContentTest_whenContentPosted_thenReturnContent() {
        //GIVEN
        Instant currentTime = Instant.now();
        Content newContent = new Content(
                null,
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                new AppUser("appUser-id-1","github-id-1", null, null),
                currentTime
        );
        Content savedContent = new Content(
                "content-id-1",
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                new AppUser("appUser-id-1","github-id-1", null, null),
                currentTime
        );

        when(mockContentRepository.save(newContent)).thenReturn(savedContent);

        //WHEN
        Content actual = contentService.createContent(newContent);

        //THEN
        verify(mockContentRepository, times(1)).save(newContent);
        assertEquals(savedContent, actual);
    }
}