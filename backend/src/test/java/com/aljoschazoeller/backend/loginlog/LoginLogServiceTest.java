package com.aljoschazoeller.backend.loginlog;

import com.aljoschazoeller.backend.loginlog.domain.LoginLog;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.time.Instant;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LoginLogServiceTest {
    private final LoginLogRepository mockLoginLogRepository = mock(LoginLogRepository.class);
    private final LoginLogService loginLogService = new LoginLogService(mockLoginLogRepository);

    @Test
    void logLoginTest_whenCalled_thenLogIsSaved() {
        //GIVEN
        AppUser appUser = new AppUser("1", "githubId", new HashMap<>(), Instant.now());
        String ipAddress = "192.168.0.1";
        String browserInfo = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

        //WHEN
        loginLogService.logLogin(appUser, ipAddress, browserInfo);
        ArgumentCaptor<LoginLog> argumentCaptor = ArgumentCaptor.forClass(LoginLog.class);
        verify(mockLoginLogRepository, times(1)).save(argumentCaptor.capture());

        //THEN
        LoginLog capturedLoginLog = argumentCaptor.getValue();
        assertEquals(appUser, capturedLoginLog.appUser());
        assertEquals(ipAddress, capturedLoginLog.ipAddress());
        assertEquals(browserInfo, capturedLoginLog.userAgent());
        assertTrue(capturedLoginLog.createdAt().isBefore(Instant.now()));


    }

}