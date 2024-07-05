import { Flex, Skeleton } from "@chakra-ui/react";
import ContentCard from "../ContentCard/ContentCard.tsx";
import { ContentType } from "../../../model/contentModel.ts";
import { contentMovie } from "../../../model/contentTestData.ts";

type ContentResultBodyProps = {
  content: ContentType[];
  isLoading: boolean;
};

export default function ContentResultBody({
  content,
  isLoading,
}: Readonly<ContentResultBodyProps>) {
  const skeletons = [0, 1, 2];

  return (
    <Flex flexDirection="column" gap={4}>
      {isLoading
        ? skeletons.map((_, index) => (
            <Skeleton isLoaded={!isLoading}>
              <ContentCard key={index} content={contentMovie} />
            </Skeleton>
          ))
        : content.map((content) => {
            return <ContentCard key={content.id} content={content} />;
          })}
    </Flex>
  );
}
