import axios from "axios";
import useSWR from "swr";
import {
  GithubUserAuthType,
  GithubUserSyncedType,
} from "../model/githubModel.ts";

export function processSingleGithubUserSynced(
  rawGithubUser: GithubUserSyncedType
): GithubUserSyncedType {
  return {
    ...rawGithubUser,
    created_at: rawGithubUser.created_at,
    updated_at: rawGithubUser.updated_at,
  };
}

export function useGithubUserById(githubId: string | undefined): {
  githubUser: GithubUserAuthType | undefined;
  isLoading: boolean;
  isError: Error | undefined;
} {
  const fetcher = (githubId: string) =>
    axios
      .get(`https://api.github.com/user/${githubId}`)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));

  const { data, error, isLoading } = useSWR(githubId, fetcher);

  return { githubUser: data, isLoading, isError: error };
}
