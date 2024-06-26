package com.aljoschazoeller.backend.content.domain;

import com.aljoschazoeller.backend.exceptions.InvalidContentTypeException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.util.Arrays;

public class ContentTypeDeserializer extends JsonDeserializer<ContentType> {

    @Override
    public ContentType deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        String value = jsonParser.getValueAsString();
        try {
            return ContentType.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException exception) {
            String validValues = Arrays.toString(ContentType.values());
            throw new InvalidContentTypeException("Invalid content type: '" + value + "'. Accepted values are " + validValues);
        }
    }
}
