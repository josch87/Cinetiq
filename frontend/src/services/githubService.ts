import axios from "axios";
import useSWR from "swr";

export function useGithubUserById(githubId: string | undefined) {
  const fetcher = (githubId: string) =>
    axios
      .get(`https://api.github.com/user/${githubId}`)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));

  const { data, error, isLoading } = useSWR(githubId, fetcher);

  return { githubUser: data, isLoading, isError: error };
}
