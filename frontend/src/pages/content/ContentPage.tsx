import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../../model/userModel.ts";
import {
  contentSkeletonData,
  contentType,
  infoType,
} from "../../model/contentModel.ts";
import { Container, Flex, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getContent } from "../../services/contentService.ts";
import ContentResultHeader from "../../components/ContentResult/ContentResultHeader.tsx";
import NoData from "../../components/NoData/NoData.tsx";
import ContentResultBody from "../../components/ContentResult/ContentResultBody.tsx";
import ContentCard from "../../components/ContentCard/ContentCard.tsx";

type ContentPageProps = {
  user: githubUserType | null | undefined;
};

export default function ContentPage({ user }: Readonly<ContentPageProps>) {
  const [info, setInfo] = useState<infoType | undefined | null>(undefined);
  const [content, setContent] = useState<contentType[] | undefined | null>(
    undefined
  );

  useEffect(() => {
    getContent()
      .then((response) => {
        if (response) {
          setInfo(response.info);
          setContent(response.content);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setInfo(null);
        setContent(null);
      });
  }, []);

  if (info === null || content === null) {
    return <>Some error occurred</>;
  }

  if (info === undefined || content === undefined) {
    return (
      <DefaultPageTemplate
        pageTitle="Content"
        pageSubtitle="Display all content"
        user={user}
      >
        <ContentResultHeader info={info} />

        <Flex flexDirection="column" gap={4}>
          <Skeleton>
            <ContentCard content={contentSkeletonData} />
          </Skeleton>
          <Skeleton>
            <ContentCard content={contentSkeletonData} />
          </Skeleton>
          <Skeleton>
            <ContentCard content={contentSkeletonData} />
          </Skeleton>
        </Flex>
      </DefaultPageTemplate>
    );
  }

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
          <ContentResultHeader info={info} />
          <ContentResultBody content={content} />
        </>
      )}
    </DefaultPageTemplate>
  );
}
