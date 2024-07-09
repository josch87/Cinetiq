package com.aljoschazoeller.backend.person;

import com.aljoschazoeller.backend.exceptions.PersonNotFoundException;
import com.aljoschazoeller.backend.person.domain.Person;
import com.aljoschazoeller.backend.person.domain.PersonStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private static final Logger log = LoggerFactory.getLogger(PersonService.class);
    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> getAllActivePeople() {
        return personRepository.findAllByStatus(PersonStatus.ACTIVE);
    }

    public Person getPersonById(String id) {
        return personRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Could not find person with ID '{}'", id);
                    return new PersonNotFoundException("No person found with ID '" + id + "'.");
                });
    }

    public Person createPerson(Person person) {
        if (person.id() != null) {
            log.error("ID '{}' must be NULL in order to create a new person.", person.id());
            throw new IllegalArgumentException("ID must be NULL in order to create a new person.");
        }
        return personRepository.insert(person);
    }
}
