import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.tsx";
import { GithubUserType } from "../model/userModel.ts";

type ProtectedRoutesProps = {
  user: GithubUserType | null | undefined;
};

export default function ProtectedRoutes({
  user,
}: Readonly<ProtectedRoutesProps>) {
  if (user === undefined) {
    return <LoadingSpinner />;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
}
