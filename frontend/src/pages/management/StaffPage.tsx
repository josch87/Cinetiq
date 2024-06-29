import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../../model/userModel.ts";

type StaffPageProps = {
  user: githubUserType | null | undefined;
};

export default function StaffPage({ user }: Readonly<StaffPageProps>) {
  return (
    <DefaultPageTemplate
      pageTitle="Staff"
      pageSubtitle="Display all staff accounts"
      user={user}
    >
      Staff
    </DefaultPageTemplate>
  );
}
