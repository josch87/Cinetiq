import { AppUserType } from "./userModel.ts";
import { githubUser, githubUser2 } from "./githubTestData.ts";

export const appUser: AppUserType = {
  id: "appUser-id-1",
  githubId: "github-id-1",
  githubUserProfileSynced: githubUser,
  githubUserProfileSyncedAt: new Date("2024-06-11T14:13:12.125Z"),
  githubUserProfileUpdatedAt: new Date("2024-06-12T12:15:13.512Z"),
  githubUserProfileActive: true,
  status: "ACTIVE",
  createdAt: new Date("2024-05-10T15:10:05.217Z"),
};

export const appUser2: AppUserType = {
  id: "appUser-id-2",
  githubId: "github-id-2",
  githubUserProfileSynced: githubUser2,
  githubUserProfileSyncedAt: new Date("2024-06-11T14:13:12.125Z"),
  githubUserProfileUpdatedAt: new Date("2024-06-12T12:15:13.512Z"),
  githubUserProfileActive: true,
  status: "ACTIVE",
  createdAt: new Date("2024-05-10T15:10:05.217Z"),
};

export const appUserArray: AppUserType[] = [appUser, appUser2];

export const appUsersSkeletonData: AppUserType[] = [
  {
    id: "1",
    githubId: "1",
    githubUserProfileSynced: githubUser,
    githubUserProfileSyncedAt: new Date("2024-07-02T12:15:13"),
    githubUserProfileUpdatedAt: new Date("2024-07-02T12:15:13"),
    githubUserProfileActive: true,
    status: "ACTIVE",
    createdAt: new Date("2024-07-02T12:15:13"),
  },
];
