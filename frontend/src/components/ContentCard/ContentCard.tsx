import { Card, CardHeader, Heading } from "@chakra-ui/react";
import { contentType } from "../../model/contentModel.ts";

type ContentCardProps = {
  content: contentType;
};

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          {content.englishTitle ?? content.germanTitle ?? content.originalTitle}
        </Heading>
      </CardHeader>
    </Card>
  );
}
