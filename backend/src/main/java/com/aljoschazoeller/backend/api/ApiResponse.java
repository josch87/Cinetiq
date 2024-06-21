package com.aljoschazoeller.backend.api;

import java.util.Collection;

public class ApiResponse<T> {
        private ResponseInfo info;
        private T data;

    public ApiResponse(T data) {
        if (data instanceof Collection<?>) {
            this.info = new ResponseInfo(((Collection<?>) data).size());
        } else {
            this.info = new ResponseInfo();
        }
        this.data = data;
    }

    public ResponseInfo getInfo() {
        return info;
    }

    public T getData() {
        return data;
    }
}
