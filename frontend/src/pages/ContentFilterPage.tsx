import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../model/userModel.ts";
import ContentCard from "../components/ContentCard/ContentCard.tsx";
import { contentType } from "../model/contentModel.ts";
import { Flex } from "@chakra-ui/react";

type ContentFilterPageProps = {
  user: githubUserType | null | undefined;
};

const tempData: contentType[] = [
  {
    id: "1",
    title: "Men in black",
    edition: 17,
  },
  {
    id: "2",
    title: "Black panther",
    edition: 12,
  },
  {
    id: "3",
    title: "Seven pounds",
    edition: 35,
  },
];

export default function ContentFilterPage({
  user,
}: Readonly<ContentFilterPageProps>) {
  return (
    <DefaultPageTemplate
      pageTitle="Content Filter"
      pageSubtitle="Show and filter all content"
      user={user}
    >
      <Flex flexDirection="column" gap={4}>
        {tempData.map((content) => {
          return <ContentCard content={content} />;
        })}
      </Flex>
    </DefaultPageTemplate>
  );
}
