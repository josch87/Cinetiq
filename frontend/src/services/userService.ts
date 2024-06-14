import axios from "axios";
import { githubUserType } from "../model/userModel.ts";

export function login() {
  const host =
    window.location.host === "localhost:5173"
      ? "http://localhost:8080"
      : window.location.origin;

  window.open(host + "/oauth2/authorization/github", "_self");
}

export function logout() {
  const host =
    window.location.host === "localhost:5173"
      ? "http://localhost:8080"
      : window.location.origin;

  window.open(host + "/logout", "_self");
}

export const loadUser = (): Promise<githubUserType | null> => {
  return axios
    .get<githubUserType>("/api/auth/me")
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export async function authCheck(action: () => void) {
  const user = await loadUser();
  if (!user) {
    console.error("User is not authenticated!!");
    throw new Error("User is not authenticated!");
  }
  await action();
}
