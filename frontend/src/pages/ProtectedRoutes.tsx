import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.tsx";
import { GithubUserAuthType } from "../model/githubModel.ts";
import { APP_ROUTES } from "../constants/routes.ts";

type ProtectedRoutesProps = {
  user: GithubUserAuthType | null | undefined;
};

export default function ProtectedRoutes({
  user,
}: Readonly<ProtectedRoutesProps>) {
  if (user === undefined) {
    return <LoadingSpinner />;
  }

  return user ? <Outlet /> : <Navigate to={APP_ROUTES.HOME} />;
}
