export type AppUserType = {
  id: string;
  githubId: string;
  createdAt: Date;
};

export type GithubUserType = {
  id: string;
  username?: string;
  avatarUrl?: string;
  name?: string;
  company?: string;
  location?: string;
  bio?: string;
};
