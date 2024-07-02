import axios from "axios";
import { GithubUserAuthType } from "../model/githubModel.ts";

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

export const loadUser = (): Promise<GithubUserAuthType | null> => {
  return axios
    .get("/api/auth/me")
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export async function authCheck(action: () => Promise<void>) {
  const user = await loadUser();
  if (!user) {
    console.error("User is not authenticated!");
    throw new Error("User is not authenticated!");
  }
  await action();
}

export async function isLoggedIn(): Promise<boolean> {
  try {
    await authCheck(async () => {});
    return true;
  } catch (error) {
    return false;
  }
}
