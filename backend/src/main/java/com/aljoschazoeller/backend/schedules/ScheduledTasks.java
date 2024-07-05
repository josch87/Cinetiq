package com.aljoschazoeller.backend.schedules;

import com.aljoschazoeller.backend.user.githubsync.GithubSyncService;
import com.aljoschazoeller.backend.user.githubsync.domain.StartedBySystem;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    private final GithubSyncService githubSyncService;

    public ScheduledTasks(GithubSyncService githubSyncService) {
        this.githubSyncService = githubSyncService;
    }

    @Scheduled(cron = "0 0 * * * ?")
    public void syncGithubUserProfiles() {
        githubSyncService.syncGithubUserProfiles(StartedBySystem.SCHEDULER, null);
    }
}
