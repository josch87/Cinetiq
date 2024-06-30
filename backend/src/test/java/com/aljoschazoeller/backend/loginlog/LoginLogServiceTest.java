package com.aljoschazoeller.backend.loginlog;

import com.aljoschazoeller.backend.loginlog.domain.LoginLog;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LoginLogServiceTest {
    private final LoginLogRepository mockLoginLogRepository = mock(LoginLogRepository.class);
    private final LoginLogService loginLogService = new LoginLogService(mockLoginLogRepository);

    @Test
    void logLoginTest_whenCalled_thenLogIsSaved() {
        //GIVEN
        Instant mockedTime = Instant.parse("2024-06-29T13:51:12.235Z");
        AppUser appUser = AppUser.builder()
                .id("1")
                .githubId("githubId")
                .createdAt(Instant.now())
                .build();

        String ipAddress = "192.168.0.1";
        String browserInfo = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

        //WHEN
        loginLogService.logLogin(appUser, ipAddress, browserInfo, mockedTime);
        ArgumentCaptor<LoginLog> argumentCaptor = ArgumentCaptor.forClass(LoginLog.class);
        verify(mockLoginLogRepository, times(1)).save(argumentCaptor.capture());

        //THEN
        LoginLog capturedLoginLog = argumentCaptor.getValue();
        assertEquals(appUser, capturedLoginLog.appUser());
        assertEquals(ipAddress, capturedLoginLog.ipAddress());
        assertEquals(browserInfo, capturedLoginLog.userAgent());
        assertEquals(mockedTime, capturedLoginLog.createdAt());
    }

}