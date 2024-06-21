export type appUserType = {
  id: string;
  githubId: string;
  createdAt: Date;
};

export type githubUserType = {
  id: string;
  username?: string;
  avatarUrl?: string;
  name?: string;
  company?: string;
  location?: string;
  bio?: string;
};
