package com.aljoschazoeller.backend.api;

import java.time.ZonedDateTime;

public class ResponseInfo {
        private final Integer count;
        private final ZonedDateTime timestamp;


    public ResponseInfo(int count) {
        this.count = count;
        this.timestamp = ZonedDateTime.now();
    }

    public ResponseInfo() {
        this.count = null;
        this.timestamp = ZonedDateTime.now();
    }

    public Integer getCount() {
        return count;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }
}
