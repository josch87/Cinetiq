package com.aljoschazoeller.backend.person;

import com.aljoschazoeller.backend.person.domain.Person;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    public Person createContent(Person person) {
        return personRepository.save(person);
    }
}
