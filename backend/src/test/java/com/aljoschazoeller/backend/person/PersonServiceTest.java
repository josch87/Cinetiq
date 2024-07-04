package com.aljoschazoeller.backend.person;

import com.aljoschazoeller.backend.exceptions.PersonNotFoundException;
import com.aljoschazoeller.backend.person.domain.Person;
import com.aljoschazoeller.backend.person.domain.PersonStatus;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PersonServiceTest {

    private final PersonRepository mockPersonRepository = mock(PersonRepository.class);
    private final PersonService personService = new PersonService(mockPersonRepository);

    @Test
    void getAllActivePeopleTest_whenNoActivePersonInDatabase_thenReturnEmptyList() {
        //GIVEN
        when(mockPersonRepository.findAllByStatus(PersonStatus.ACTIVE)).thenReturn(Collections.emptyList());

        //WHEN
        List<Person> actual = personService.getAllActivePeople();

        //THEN
        assertTrue(actual.isEmpty());
        verify(mockPersonRepository, times(1)).findAllByStatus(PersonStatus.ACTIVE);
    }

    @Test
    void getAllActivePeopleTest_whenOneActivePersonInDatabase_thenReturnListWithOne() {
        //GIVEN
        Person expected = Person.builder()
                .id("1")
                .status(PersonStatus.ACTIVE)
                .firstName("John")
                .lastName("Doe")
                .createdBy(AppUser.builder().id("appUser-id-1").build())
                .createdAt(Instant.parse("2024-07-03T20:17:18.151Z"))
                .build();

        when(mockPersonRepository.findAllByStatus(PersonStatus.ACTIVE)).thenReturn(Collections.singletonList(expected));

        //WHEN
        List<Person> actual = personService.getAllActivePeople();

        //THEN
        verify(mockPersonRepository, times(1)).findAllByStatus(PersonStatus.ACTIVE);
        assertEquals(Collections.singletonList(expected), actual);
    }

    @Test
    void getPersonByIdTest_whenPersonNotFound_thenThrowPersonNotFoundException() {
        //GIVEN
        when(mockPersonRepository.findById("-1")).thenReturn(Optional.empty());

        //WHEN
        PersonNotFoundException exception = assertThrows(PersonNotFoundException.class, () -> personService.getPersonById("-1"));

        //THEN
        verify(mockPersonRepository, times(1)).findById("-1");
        assertEquals("No person found with ID '-1'.", exception.getMessage());
    }

    @Test
    void getPersonByIdTest_whenPersonFound_thenReturnPerson() {
        //GIVEN
        Person expected = Person.builder()
                .id("1")
                .status(PersonStatus.ACTIVE)
                .firstName("John")
                .lastName("Doe")
                .createdBy(AppUser.builder().id("appUser-id-1").build())
                .createdAt(Instant.parse("2024-07-03T20:17:18.151Z"))
                .build();

        when(mockPersonRepository.findById("1")).thenReturn(Optional.of(expected));

        //WHEN
        Person actual = personService.getPersonById("1");

        //THEN
        verify(mockPersonRepository, times(1)).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void createPersonTest_whenPersonPosted_thenReturnContent() {
        //GIVEN
        Person personToSave = Person.builder()
                .status(PersonStatus.ACTIVE)
                .firstName("John")
                .lastName("Doe")
                .createdBy(AppUser.builder().id("appUser-id-1").build())
                .createdAt(Instant.parse("2024-07-03T20:17:18.151Z"))
                .build();

        Person expected = Person.builder()
                .id("1")
                .status(PersonStatus.ACTIVE)
                .firstName("John")
                .lastName("Doe")
                .createdBy(AppUser.builder().id("appUser-id-1").build())
                .createdAt(Instant.parse("2024-07-03T20:17:18.151Z"))
                .build();

        when(mockPersonRepository.insert(personToSave)).thenReturn(expected);

        //WHEN
        Person actual = personService.createPerson(personToSave);

        //THEN
        verify(mockPersonRepository, times(1)).insert(personToSave);
        assertEquals(expected, actual);
    }
}