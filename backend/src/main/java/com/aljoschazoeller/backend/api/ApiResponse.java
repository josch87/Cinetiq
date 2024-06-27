package com.aljoschazoeller.backend.api;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Getter
@NoArgsConstructor
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

}
