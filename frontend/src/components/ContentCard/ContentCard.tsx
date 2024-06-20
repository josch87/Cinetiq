import { Card, CardHeader, Heading } from "@chakra-ui/react";
import { contentType } from "../../model/contentModel.ts";
import ContentCardTitle from "./ContentCardTitle.tsx";
import ContentCardTypeIcon from "./ContentCardTypeIcon.tsx";

type ContentCardProps = {
  content: contentType;
};

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <Card>
      <CardHeader
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={2}
      >
        <ContentCardTypeIcon contentType={content.contentType} />
        <Heading size="md">
          <ContentCardTitle content={content} />
        </Heading>
      </CardHeader>
    </Card>
  );
}
