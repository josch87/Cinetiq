import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../model/userModel.ts";

type DashboardPageProps = {
  user: githubUserType | null | undefined;
};

export default function DashboardPage({ user }: DashboardPageProps) {
  return <DefaultPageTemplate user={user}>Dashboard</DefaultPageTemplate>;
}
