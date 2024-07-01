export type AppUserType = {
  id: string;
  githubId: string;
  githubUserProfilSynced: GithubUserSyncedType;
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
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
};
