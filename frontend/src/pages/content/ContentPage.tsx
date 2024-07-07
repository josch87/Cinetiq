import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import { ContentType } from "../../model/contentModel.ts";
import { Button, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getContent } from "../../services/contentService.ts";
import ResultHeader from "../../components/ResultHeader/ResultHeader.tsx";
import NoData from "../../components/NoData/NoData.tsx";
import ContentResultBody from "../../components/content/ContentResult/ContentResultBody.tsx";
import { useContentCreationDrawerStore } from "../../store/contentStore.ts";
import { ApiResponseType } from "../../model/apiModel.ts";
import { AxiosError } from "axios";

export default function ContentPage() {
  const [contentResponse, setContentResponse] = useState<
    ApiResponseType<ContentType[]> | undefined | null
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onContentCreationDrawerOpen = useContentCreationDrawerStore(
    (state) => state.onOpen
  );

  useEffect(() => {
    getContent()
      .then((response) => {
        if (response) {
          setContentResponse(response);
          setIsLoading(false);
        }
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
        setContentResponse(null);
      });
  }, []);

  if (contentResponse === null) {
    return <>Some error occurred</>;
  }

  return (
    <DefaultPageTemplate pageTitle="Content" pageSubtitle="Display all content">
      {contentResponse && contentResponse.info.count === 0 ? (
        <VStack gap={8}>
          <NoData />
          <Button colorScheme="brand" onClick={onContentCreationDrawerOpen}>
            Create content
          </Button>
        </VStack>
      ) : (
        <>
          <ResultHeader info={contentResponse?.info} isLoading={isLoading} />
          <ContentResultBody
            content={contentResponse?.data ?? []}
            isLoading={isLoading}
          />
        </>
      )}
    </DefaultPageTemplate>
  );
}
