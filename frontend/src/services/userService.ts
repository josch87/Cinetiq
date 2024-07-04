import { AppUserType } from "../model/userModel.ts";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponseType } from "../model/apiModel.ts";
import { processSingleGithubUserSynced } from "./githubService.ts";

export function processSingleAppUser(rawAppUser: AppUserType): AppUserType {
  const githubUser = processSingleGithubUserSynced(
    rawAppUser.githubUserProfileSynced
  );
  return {
    ...rawAppUser,
    githubUserProfileSynced: githubUser,
    githubUserProfileSyncedAt: new Date(rawAppUser.githubUserProfileSyncedAt),
    githubUserProfileUpdatedAt: new Date(rawAppUser.githubUserProfileUpdatedAt),
    createdAt: new Date(rawAppUser.createdAt),
  };
}

function processAppUserArray(rawAppUsers: AppUserType[]): AppUserType[] {
  return rawAppUsers.map((user) => {
    return processSingleAppUser(user);
  });
}

export function getUsers(): Promise<ApiResponseType<AppUserType[]> | null> {
  return axios
    .get("/api/users")
    .then((response: AxiosResponse<ApiResponseType<AppUserType[]>, any>) => {
      const appUsers = processAppUserArray(response.data.data);
      const returnValue: ApiResponseType<AppUserType[]> = {
        info: response.data.info,
        data: appUsers,
      };
      return returnValue;
    })
    .catch((error: AxiosError) => {
      console.error(error.message);
      return null;
    });
}
