package com.aljoschazoeller.backend.loginlog;

import com.aljoschazoeller.backend.loginlog.domain.LoginLog;
import com.aljoschazoeller.backend.user.domain.AppUser;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class LoginLogService {

    private final LoginLogRepository loginLogRepository;

    public LoginLogService(LoginLogRepository loginLogRepository) {
        this.loginLogRepository = loginLogRepository;
    }

    public void logLogin(AppUser appUser, String ipAddress, String browserInfo) {
        LoginLog loginLogToSave = new LoginLog(
                null,
                appUser,
                Instant.now(),
                ipAddress,
                browserInfo
        );

        loginLogRepository.save(loginLogToSave);
    }
}
