package com.aljoschazoeller.backend.contenttitle;

import com.aljoschazoeller.backend.base.titletype.domain.TitleType;
import org.springframework.data.mongodb.core.mapping.DBRef;

public record ContentTitle(
        @DBRef
        TitleType titleType,
        String title
) {
}
