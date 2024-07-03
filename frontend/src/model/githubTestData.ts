import { GithubUserSyncedType, GithubUserAuthType } from "./githubModel.ts";

export const githubUserLoggedIn: GithubUserAuthType = {
  id: "1",
  name: "loggedin name",
};

export const githubUser: GithubUserSyncedType = {
  login: "github-username-1",
  id: 1,
  avatar_url: "avatarUrl 1",
  url: "url 1",
  html_url: "htmlUrl 1",
  name: "githubName one",
  created_at: new Date("2023-12-07T14:10:02.523Z"),
  updated_at: new Date("2024-05-17T12:58:18.253Z"),
};

export const githubUser2: GithubUserSyncedType = {
  login: "github-username-2",
  id: 2,
  avatar_url: "avatarUrl",
  url: "url 2",
  html_url: "htmlUrl 2",
  name: "githubName two",
  created_at: new Date("2024-03-07T14:10:02.523Z"),
  updated_at: new Date("2024-06-17T12:58:18.253Z"),
};
