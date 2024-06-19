package com.aljoschazoeller.backend.base.titletype;

import com.aljoschazoeller.backend.base.titletype.domain.TitleType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TitleTypeRepository extends MongoRepository<TitleType, String> {
}
