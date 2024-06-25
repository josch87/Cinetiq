package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.ContentStatus;
import com.aljoschazoeller.backend.content.domain.ContentType;
import com.aljoschazoeller.backend.exceptions.ContentNotFoundException;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.security.Principal;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ContentServiceTest {

    private final ContentRepository mockContentRepository = mock(ContentRepository.class);
    private final UserService mockUserService = mock(UserService.class);
    private final ContentService contentService = new ContentService(mockContentRepository, mockUserService) {
    };

    @Test
    void getAllContentTest_whenNoActiveContentInDatabase_thenReturnEmptyList() {
        //GIVEN

        //WHEN
        List<Content> actual = contentService.getAllActiveContent();
        when(mockContentRepository.findContentByStatus(ContentStatus.ACTIVE)).thenReturn(Collections.emptyList());


        //THEN
        assertTrue(actual.isEmpty());
        verify(mockContentRepository, times(1)).findContentByStatus(ContentStatus.ACTIVE);
    }

    @Test
    void getAllContentTest_whenOneActiveContentInDatabase_thenReturnListWithOne() {
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
        when(mockContentRepository.findContentByStatus(ContentStatus.ACTIVE)).thenReturn(Collections.singletonList(expected));

        //WHEN
        List<Content> actual = contentService.getAllActiveContent();

        //THEN
        verify(mockContentRepository).findContentByStatus(ContentStatus.ACTIVE);
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

    @Test
    void softDeleteContentByIdTest_whenContentDoesNotExist_thenThrowContentNotFoundException() {
        Principal mockPrincipal = mock(Principal.class);

        ContentNotFoundException exception = assertThrows(ContentNotFoundException.class, () -> contentService.softDeleteContentById("-1", mockPrincipal));
        verify(mockContentRepository).findById("-1");
        assertEquals("No content found with ID -1", exception.getMessage());
    }

    @Test
    void softDeleteContentByIdTest_whenContentExists_thenContentIsSoftDeleted() {
        //Given
        Principal mockPrincipal = mock(Principal.class);

        Instant currentTime = Instant.now();
        Content contentToDelete = new Content(
                "1",
                ContentStatus.ACTIVE,
                null,
                null,
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                new AppUser("appUser-id-1", "github-id-1", null, null),
                currentTime
        );

        AppUser statusUpdatedByUser = new AppUser("appUser-id-2", "github-id-2", null, null);

        Content deletedContent = new Content(
                "1",
                ContentStatus.DELETED,
                Instant.parse("2024-06-24T22:10:05.108Z"),
                statusUpdatedByUser,
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                new AppUser("appUser-id-1", "github-id-1", null, null),
                currentTime
        );

        when(mockContentRepository.save(contentToDelete)).thenReturn(deletedContent);

        when(mockPrincipal.getName()).thenReturn(statusUpdatedByUser.githubId());
        when(mockUserService.findByGithubId(statusUpdatedByUser.githubId())).thenReturn(statusUpdatedByUser);
        when(mockContentRepository.findById("1")).thenReturn(Optional.of(contentToDelete));

        //WHEN
        contentService.softDeleteContentById("1", mockPrincipal);

        //THEN
        ArgumentCaptor<Content> contentCaptor = ArgumentCaptor.forClass(Content.class);
        verify(mockContentRepository).save(contentCaptor.capture());

        Content capturedContent = contentCaptor.getValue();
        assertEquals(ContentStatus.DELETED, capturedContent.status());
        assertEquals(statusUpdatedByUser, capturedContent.statusUpdatedBy());
    }
}