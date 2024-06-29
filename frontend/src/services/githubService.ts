import axios from "axios";
import useSWR from "swr";
import { GithubUserType } from "../model/userModel.ts";

export function useGithubUserById(githubId: string | undefined): {
  githubUser: GithubUserType | undefined;
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
