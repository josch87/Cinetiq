import { AppUserType } from "../model/userModel.ts";
import axios from "axios";
import { ApiResponseType } from "../model/apiModel.ts";

export const getUsers = (): Promise<ApiResponseType<AppUserType[]> | null> => {
  return axios
    .get("/api/users")
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
