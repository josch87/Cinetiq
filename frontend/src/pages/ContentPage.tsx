import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../model/userModel.ts";
import ContentCard from "../components/ContentCard/ContentCard.tsx";
import { contentType, infoType } from "../model/contentModel.ts";
import { Container, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getContent } from "../services/contentService.ts";
import ContentFilterResultHeader from "../components/ContentFilterResultHeader.tsx";
import NoData from "../components/NoData/NoData.tsx";

type ContentPageProps = {
  user: githubUserType | null | undefined;
};

export default function ContentPage({ user }: Readonly<ContentPageProps>) {
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
      pageTitle="Content"
      pageSubtitle="Display all content"
      user={user}
    >
      {info.count === 0 ? (
        <Container>
          <NoData />
        </Container>
      ) : (
        <>
          {" "}
          <ContentFilterResultHeader info={info} />
          <Flex flexDirection="column" gap={4}>
            {content.map((content) => {
              return <ContentCard key={content.id} content={content} />;
            })}
          </Flex>
        </>
      )}
    </DefaultPageTemplate>
  );
}
