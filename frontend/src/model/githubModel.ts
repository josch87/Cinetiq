export type GithubUserAuthType = {
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
