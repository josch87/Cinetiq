package com.aljoschazoeller.backend.person;

import com.aljoschazoeller.backend.api.ApiResponse;
import com.aljoschazoeller.backend.person.domain.NewPersonDTO;
import com.aljoschazoeller.backend.person.domain.Person;
import com.aljoschazoeller.backend.person.domain.PersonStatus;
import com.aljoschazoeller.backend.user.UserService;
import com.aljoschazoeller.backend.user.domain.AppUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.Instant;

@RestController
@RequestMapping("/api/people")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;
    private final UserService userService;

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<Person> getPersonById(@PathVariable String id) {
        Person person = personService.getPersonById(id);
        return new ApiResponse<>(person);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<Person> createPerson(Principal principal, @Valid @RequestBody NewPersonDTO body) {
        Instant currentTime = Instant.now();

        String githubId = principal.getName();
        AppUser appUser = userService.findByGithubId(githubId);

        Person personToSave = Person.builder()
                .firstName(body.firstName())
                .lastName(body.lastName())
                .status(PersonStatus.ACTIVE)
                .createdBy(appUser)
                .createdAt(currentTime)
                .build();

        Person savedPerson = personService.createPerson(personToSave);

        return new ApiResponse<>(savedPerson);
    }
}
