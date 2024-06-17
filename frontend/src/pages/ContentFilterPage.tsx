import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../model/userModel.ts";

type ContentFilterPageProps = {
  user: githubUserType | null | undefined;
};

export default function ContentFilterPage({
  user,
}: Readonly<ContentFilterPageProps>) {
  return (
    <DefaultPageTemplate
      pageTitle="Content Filter"
      pageSubtitle="Show and filter all content"
      user={user}
    >
      Content content
    </DefaultPageTemplate>
  );
}
