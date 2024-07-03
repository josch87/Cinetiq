package com.aljoschazoeller.backend.person;

import com.aljoschazoeller.backend.person.domain.Person;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends MongoRepository<Person, String> {
}
