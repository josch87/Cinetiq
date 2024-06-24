import axios from "axios";
import { githubUserType } from "../model/userModel.ts";

export function getGithubUserById(githubId: string): Promise<githubUserType> {
  return axios
    .get("https://api.github.com/user/" + githubId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error.message);
    });
}
