import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import { GithubUserType } from "../../model/userModel.ts";
import { contentSkeletonData, ContentType } from "../../model/contentModel.ts";
import { Button, Flex, Skeleton, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getContent } from "../../services/contentService.ts";
import ContentResultHeader from "../../components/content/ContentResult/ContentResultHeader.tsx";
import NoData from "../../components/NoData/NoData.tsx";
import ContentResultBody from "../../components/content/ContentResult/ContentResultBody.tsx";
import ContentCard from "../../components/content/ContentCard/ContentCard.tsx";
import { useContentCreationDrawerStore } from "../../store/store.ts";
import { InfoType } from "../../model/apiModel.ts";

type ContentPageProps = {
  user: GithubUserType | null | undefined;
};

export default function ContentPage({ user }: Readonly<ContentPageProps>) {
  const [info, setInfo] = useState<InfoType | undefined | null>(undefined);
  const [content, setContent] = useState<ContentType[] | undefined | null>(
    undefined
  );

  const onContentCreationDrawerOpen = useContentCreationDrawerStore(
    (state) => state.onOpen
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
        <VStack gap={8}>
          <NoData />
          <Button colorScheme="teal" onClick={onContentCreationDrawerOpen}>
            Create content
          </Button>
        </VStack>
      ) : (
        <>
          <ContentResultHeader info={info} />
          <ContentResultBody content={content} />
        </>
      )}
    </DefaultPageTemplate>
  );
}
