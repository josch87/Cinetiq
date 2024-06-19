package com.aljoschazoeller.backend.api;

import java.time.ZonedDateTime;

public class ResponseInfo {
        private final int count;
        private final ZonedDateTime timestamp;


    public ResponseInfo(int count) {
        this.count = count;
        this.timestamp = ZonedDateTime.now();
    }

    public int getCount() {
        return count;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }
}
