import { GithubUserSyncedType } from "./githubModel.ts";

export type AppUserType = {
  id: string;
  githubId: string;
  githubUserProfileSynced: GithubUserSyncedType;
  githubUserProfileSyncedAt: Date;
  githubUserProfileUpdatedAt: Date;
  githubUserProfileActive: boolean;
  status: AppUserStatusENUM;
  createdAt: Date;
};

type AppUserStatusENUM = "ACTIVE" | "INACTIVE";
