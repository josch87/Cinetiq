import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { contentType } from "../../model/contentModel.ts";

type ContentCardProps = {
  content: contentType;
};

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <Card>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading>{content.title}</Heading>
        {content.edition}. edition
      </CardHeader>

      <CardBody>Content</CardBody>
    </Card>
  );
}
