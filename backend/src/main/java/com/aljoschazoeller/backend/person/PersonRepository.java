package com.aljoschazoeller.backend.person;

import com.aljoschazoeller.backend.person.domain.Person;
import com.aljoschazoeller.backend.person.domain.PersonStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends MongoRepository<Person, String> {
    List<Person> findAllByStatus(PersonStatus personStatus);
}
