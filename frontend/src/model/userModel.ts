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

export type GithubUserType = {
  id: string;
  username?: string;
  avatarUrl?: string;
  name?: string;
  company?: string;
  location?: string;
  bio?: string;
};

export type GithubUserSyncedType = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  bio?: string;
  created_at: Date;
  updated_at: Date;
};

const githubUser: GithubUserSyncedType = {
  login: "username-1",
  id: 1,
  avatar_url: "abc",
  url: "abc",
  html_url: "abc",
  created_at: new Date("2024-07-02T12:15:13"),
  updated_at: new Date("2024-07-02T12:15:13"),
};

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
