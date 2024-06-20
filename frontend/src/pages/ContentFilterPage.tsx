import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../model/userModel.ts";
import ContentCard from "../components/ContentCard/ContentCard.tsx";
import { contentType, infoType } from "../model/contentModel.ts";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getContent } from "../services/contentService.ts";
import ContentFilterResultHeader from "../components/ContentFilterResultHeader.tsx";

type ContentFilterPageProps = {
  user: githubUserType | null | undefined;
};

export default function ContentFilterPage({
  user,
}: Readonly<ContentFilterPageProps>) {
  const [info, setInfo] = useState<infoType>({ count: 0 });
  const [content, setContent] = useState<contentType[]>([]);

  useEffect(() => {
    getContent().then((response) => {
      if (response != null) {
        setInfo(response.info);
        setContent(response.content);
      }
    });
  }, []);

  return (
    <DefaultPageTemplate
      pageTitle="Content Filter"
      pageSubtitle="Show and filter all content"
      user={user}
    >
      <ContentFilterResultHeader info={info} />
      <Flex flexDirection="column" gap={4}>
        {content.map((content) => {
          return <ContentCard key={content.id} content={content} />;
        })}
      </Flex>
    </DefaultPageTemplate>
  );
}
