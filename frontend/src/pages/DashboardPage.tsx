import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../model/userModel.ts";

type DashboardPageProps = {
  user: githubUserType | null | undefined;
};

export default function DashboardPage({ user }: Readonly<DashboardPageProps>) {
  return (
    <DefaultPageTemplate
      pageTitle="Dashboard"
      pageSubtitle="Quick access and overview of all festival data"
      user={user}
    >
      Dashboard Content
    </DefaultPageTemplate>
  );
}
