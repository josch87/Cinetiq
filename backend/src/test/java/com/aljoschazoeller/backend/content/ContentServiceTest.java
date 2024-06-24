package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.ContentType;
import com.aljoschazoeller.backend.exceptions.ContentNotFoundException;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

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
                new AppUser("appUser-id-1", "github-id-1", null, null),
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
    void getContentByIdTest_whenContentNotFound_thenThrowContentNotFoundException() {

        ContentNotFoundException exception = assertThrows(ContentNotFoundException.class, () -> contentService.getContentById("-1"));
        verify(mockContentRepository).findById("-1");
        assertEquals("No content found with ID -1", exception.getMessage());
    }

    @Test
    void getContentByIdTest_whenContentFound_thenReturnContent() {
        // GIVEN
        Content expected = new Content(
                "1",
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                new AppUser("appUser-id-1", "github-id-1", null, null),
                Instant.now()
        );
        when(mockContentRepository.findById("1")).thenReturn(Optional.of(expected));

        //WHEN
        Content actual = contentService.getContentById("1");

        //THEN
        assertEquals(expected, actual);
        verify(mockContentRepository, times(1)).findById("1");
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
                new AppUser("appUser-id-1", "github-id-1", null, null),
                currentTime
        );
        Content savedContent = new Content(
                "content-id-1",
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                new AppUser("appUser-id-1", "github-id-1", null, null),
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