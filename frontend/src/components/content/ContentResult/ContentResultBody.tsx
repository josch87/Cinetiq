import { Flex } from "@chakra-ui/react";
import ContentCard from "../ContentCard/ContentCard.tsx";
import { ContentType } from "../../../model/contentModel.ts";

type ContentResultBodyProps = {
  content: ContentType[];
};

export default function ContentResultBody({
  content,
}: Readonly<ContentResultBodyProps>) {
  return (
    <Flex flexDirection="column" gap={4}>
      {content.map((content) => {
        return <ContentCard key={content.id} content={content} />;
      })}
    </Flex>
  );
}
