import { Button } from "@chakra-ui/react";
import { logout } from "../services/userService.ts";
import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../model/userModel.ts";

type DashboardPageProps = {
  user: githubUserType | null | undefined;
};

export default function DashboardPage({ user }: DashboardPageProps) {
  return (
    <DefaultPageTemplate user={user}>
      Dashboard
      <Button onClick={logout}>Logout</Button>
    </DefaultPageTemplate>
  );
}
