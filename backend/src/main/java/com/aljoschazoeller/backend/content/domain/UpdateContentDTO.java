package com.aljoschazoeller.backend.content.domain;

import com.aljoschazoeller.backend.annotations.NullOrNotBlank;

import java.util.HashMap;
import java.util.Map;

public record UpdateContentDTO(
        @NullOrNotBlank(message = "The Original Title must have at least one non-whitespace character")
        String originalTitle,
        String englishTitle,
        String germanTitle) {

    public Map<String, Object> getAsMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("originalTitle", originalTitle);
        map.put("englishTitle", englishTitle);
        map.put("germanTitle", germanTitle);
        return map;
    }
}
