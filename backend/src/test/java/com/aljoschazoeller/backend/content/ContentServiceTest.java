package com.aljoschazoeller.backend.content;

import com.aljoschazoeller.backend.content.domain.Content;
import com.aljoschazoeller.backend.content.domain.ContentStatus;
import com.aljoschazoeller.backend.content.domain.ContentType;
import com.aljoschazoeller.backend.content.domain.UpdateContentDTO;
import com.aljoschazoeller.backend.exceptions.ContentNotFoundException;
import com.aljoschazoeller.backend.exceptions.InvalidContentStatusException;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import com.mongodb.client.result.UpdateResult;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

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
    private final MongoTemplate mockMongoTemplate = mock(MongoTemplate.class);
    private final ContentService contentService = new ContentService(mockContentRepository, mockUserService, mockMongoTemplate) {
    };

    @Test
    void getAllContentTest_whenNoActiveContentInDatabase_thenReturnEmptyList() {
        //GIVEN
        when(mockContentRepository.findContentByStatus(ContentStatus.ACTIVE)).thenReturn(Collections.emptyList());

        //WHEN
        List<Content> actual = contentService.getAllActiveContent();


        //THEN
        assertTrue(actual.isEmpty());
        verify(mockContentRepository, times(1)).findContentByStatus(ContentStatus.ACTIVE);
    }

    @Test
    void getAllContentTest_whenOneActiveContentInDatabase_thenReturnListWithOne() {
        //GIVEN
        AppUser appUser = AppUser.builder()
                .id("appUser-id-1")
                .githubId("github-id-1")
                .build();

        Content expected = new Content(
                "content-id-1",
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                appUser,
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
        //GIVEN
        when(mockContentRepository.findById("-1")).thenReturn(Optional.empty());

        //WHEN
        ContentNotFoundException exception = assertThrows(ContentNotFoundException.class, () -> contentService.getContentById("-1"));

        //THEN
        verify(mockContentRepository, times(1)).findById("-1");
        assertEquals("No content found with ID '-1'.", exception.getMessage());
    }

    @Test
    void getContentByIdTest_whenContentFound_thenReturnContent() {
        // GIVEN
        AppUser appUser = AppUser.builder()
                .id("appUser-id-1")
                .githubId("github-id-1")
                .build();

        Content expected = new Content(
                "1",
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                appUser,
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
        AppUser appUser = AppUser.builder()
                .id("appUser-id-1")
                .githubId("github-id-1")
                .build();
        Instant currentTime = Instant.now();
        Content newContent = new Content(
                null,
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                appUser,
                currentTime
        );
        Content savedContent = new Content(
                "content-id-1",
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                appUser,
                currentTime
        );

        when(mockContentRepository.insert(newContent)).thenReturn(savedContent);

        //WHEN
        Content actual = contentService.createContent(newContent);

        //THEN
        verify(mockContentRepository, times(1)).insert(newContent);
        assertEquals(savedContent, actual);
    }

    @Test
    void updateContentByIdTest_whenContentDoesNotExist_thenThrowContentNotFoundException() {
        Principal mockPrincipal = mock(Principal.class);

        when(mockContentRepository.findById("-1")).thenReturn(Optional.empty());

        ContentNotFoundException exception = assertThrows(ContentNotFoundException.class, () -> contentService.updateContentById("-1", null, mockPrincipal));
        verify(mockContentRepository).findById("-1");
        assertEquals("No content found with ID '-1'.", exception.getMessage());
    }

    @Test
    void updateContentByIdTest_whenContentIsDeleted_thenThrowInvalidContentStatusException() {
        //GIVEN
        Instant currentTime = Instant.now();
        Principal mockPrincipal = mock(Principal.class);
        AppUser appUser = AppUser.builder()
                .id("appUser-id-author")
                .githubId("github-id-author")
                .build();

        Content oldContent = new Content(
                "1",
                ContentStatus.DELETED,
                null,
                null,
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                appUser,
                currentTime,
                null,
                null
        );

        when(mockContentRepository.findById("1")).thenReturn(Optional.of(oldContent));

        //THEN

        InvalidContentStatusException exception = assertThrows(InvalidContentStatusException.class, () -> contentService.updateContentById("1", null, mockPrincipal));
        verify(mockContentRepository).findById("1");
        assertEquals("Content with ID '1' is currently not active and can not be updated.", exception.getMessage());
    }

    @Test
    void updateContentByIdTest_whenCalledWithUpdateData_thenReturnUpdatedContent() {
        //GIVEN
        Instant currentTime = Instant.now();
        Principal mockPrincipal = mock(Principal.class);
        AppUser author = AppUser.builder()
                .id("appUser-id-author")
                .githubId("github-id-author")
                .build();
        Content oldContent = new Content(
                "1",
                ContentStatus.ACTIVE,
                null,
                null,
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                author,
                currentTime,
                null,
                null
        );
        UpdateContentDTO updateContentDTO = new UpdateContentDTO("New original title", "New english title", "New german title");

        AppUser lastUpdatedByUser = AppUser.builder()
                .id("appUser-id-2")
                .githubId("github-id-2")
                .build();

        when(mockPrincipal.getName()).thenReturn(lastUpdatedByUser.githubId());
        when(mockUserService.findByGithubId(lastUpdatedByUser.githubId())).thenReturn(lastUpdatedByUser);
        when(mockContentRepository.findById("1")).thenReturn(Optional.of(oldContent));


        Instant updateTime = Instant.parse("2024-06-28T15:17:12.267Z");

        Content expected = new Content(
                "1",
                ContentStatus.ACTIVE,
                null,
                null,
                ContentType.MOVIE,
                "New original Title",
                "New english Title",
                "New german Title",
                author,
                currentTime,
                lastUpdatedByUser,
                updateTime
        );

        when(mockMongoTemplate.updateFirst(any(Query.class), any(Update.class), eq(Content.class))).thenReturn(UpdateResult.acknowledged(1, 1L, null));
        when(mockMongoTemplate.findOne(any(Query.class), eq(Content.class))).thenReturn(expected);

        //WHEN
        Content actual = contentService.updateContentById("1", updateContentDTO, mockPrincipal);

        //THEN
        verify(mockContentRepository).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void softDeleteContentByIdTest_whenContentDoesNotExist_thenThrowContentNotFoundException() {
        Principal mockPrincipal = mock(Principal.class);

        when(mockContentRepository.findById("-1")).thenReturn(Optional.empty());
        ContentNotFoundException exception = assertThrows(ContentNotFoundException.class, () -> contentService.softDeleteContentById("-1", mockPrincipal));
        verify(mockContentRepository).findById("-1");
        assertEquals("No content found with ID '-1'.", exception.getMessage());
    }

    @Test
    void softDeleteContentByIdTest_whenContentExists_thenContentIsSoftDeleted() {
        //Given
        Principal mockPrincipal = mock(Principal.class);

        Instant currentTime = Instant.now();
        AppUser appUser = AppUser.builder()
                .id("appUser-id-1")
                .githubId("github-id-1")
                .build();
        Content contentToDelete = new Content(
                "1",
                ContentStatus.ACTIVE,
                null,
                null,
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                appUser,
                currentTime,
                null,
                null
        );

        AppUser statusUpdatedByUser = AppUser.builder()
                .id("appUser-id-2")
                .githubId("github-id-2")
                .build();

        Content deletedContent = new Content(
                "1",
                ContentStatus.DELETED,
                statusUpdatedByUser,
                Instant.parse("2024-06-24T22:10:05.108Z"),
                ContentType.MOVIE,
                "Original Title",
                "English Title",
                "German Title",
                appUser,
                currentTime,
                null,
                null
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