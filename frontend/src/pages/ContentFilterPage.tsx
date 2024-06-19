import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../model/userModel.ts";
import ContentCard from "../components/ContentCard/ContentCard.tsx";
import { contentType } from "../model/contentModel.ts";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getContent } from "../services/contentService.ts";

type ContentFilterPageProps = {
  user: githubUserType | null | undefined;
};

export default function ContentFilterPage({
  user,
}: Readonly<ContentFilterPageProps>) {
  const [content, setContent] = useState<contentType[]>([]);

  useEffect(() => {
    getContent().then((response) => {
      if (response != null) {
        setContent(response);
      }
    });
  }, []);

  return (
    <DefaultPageTemplate
      pageTitle="Content Filter"
      pageSubtitle="Show and filter all content"
      user={user}
    >
      <Flex flexDirection="column" gap={4}>
        {content.map((content) => {
          return <ContentCard key={content.id} content={content} />;
        })}
      </Flex>
    </DefaultPageTemplate>
  );
}
