import { GithubUserSyncedType, GithubUserAuthType } from "./githubModel.ts";

export const githubUserLoggedIn: GithubUserAuthType = {
  id: "1",
  name: "loggedin name",
};

export const githubUser: GithubUserSyncedType = {
  login: "github-username",
  id: 1,
  avatar_url: "avatarUrl",
  url: "url",
  html_url: "htmlUrl",
  name: "github name",
  created_at: new Date("2023-12-07T14:10:02.523Z"),
  updated_at: new Date("2024-05-17T12:58:18.253Z"),
};
