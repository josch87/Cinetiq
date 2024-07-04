import { GithubUserSyncedType } from "../model/githubModel.ts";

export function processSingleGithubUserSynced(
  rawGithubUser: GithubUserSyncedType
): GithubUserSyncedType {
  return {
    ...rawGithubUser,
    created_at: rawGithubUser.created_at,
    updated_at: rawGithubUser.updated_at,
  };
}
