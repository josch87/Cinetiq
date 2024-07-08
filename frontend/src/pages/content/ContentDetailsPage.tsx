import { useParams } from "react-router-dom";
import { getContentById } from "../../services/contentService.ts";
import { useEffect, useState } from "react";
import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import ContentDetailsHeader from "../../components/content/ContentDetailsHeader/ContentDetailsHeader.tsx";
import ContentDetailsBody from "../../components/content/ContentDetailsBody/ContentDetailsBody.tsx";
import { useContentStore } from "../../store/contentStore.ts";
import NoData from "../../components/NoData/NoData.tsx";
import { VStack } from "@chakra-ui/react";

export default function ContentDetailsPage() {
  const params = useParams();
  const id: string | undefined = params.id;

  const content = useContentStore((state) => state.content);
  const setContent = useContentStore((state) => state.setContent);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (content?.id !== id) {
      setIsLoading(true);
    } else if (content?.id === id) {
      setIsLoading(false);
    }
  }, [content, id]);

  useEffect(() => {
    if (id) {
      getContentById(id)
        .then((response) => {
          if (response) {
            setContent(response.data);
          } else {
            setContent(null);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setContent(null);
        });
    }
  }, [id]); //eslint-disable-line react-hooks/exhaustive-deps

  if (content === null) {
    return (
      <DefaultPageTemplate
        pageTitle="Content Details"
        pageSubtitle="Display details of the content"
        warning={false}
      >
        <VStack gap={8}>
          <NoData text={`Could not find content with ID '${id}'`} />
        </VStack>
      </DefaultPageTemplate>
    );
  }

  return (
    <DefaultPageTemplate
      pageTitle="Content Details"
      pageSubtitle="Display details of the content"
      warning={content ? content?.status != "ACTIVE" : false}
    >
      <ContentDetailsHeader content={content} isLoading={isLoading} />
      <ContentDetailsBody content={content} isLoading={isLoading} />
    </DefaultPageTemplate>
  );
}
