package com.aljoschazoeller.backend.person;

import com.aljoschazoeller.backend.exceptions.PersonNotFoundException;
import com.aljoschazoeller.backend.person.domain.Person;
import com.aljoschazoeller.backend.person.domain.PersonStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> getAllActivePeople() {
        return personRepository.findAllByStatus(PersonStatus.ACTIVE);
    }

    public Person getPersonById(String id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new PersonNotFoundException("No person found with ID '" + id + "'."));
    }

    public Person createPerson(Person person) {
        return personRepository.save(person);
    }
}
