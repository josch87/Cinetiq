import { Card, CardHeader, Heading } from "@chakra-ui/react";
import { contentType } from "../../model/contentModel.ts";
import ContentTitle from "../ContentTitle/ContentTitle.tsx";
import ContentTypeIcon from "../ContentTypeIcon/ContentTypeIcon.tsx";
import { useNavigate } from "react-router-dom";

type ContentCardProps = {
  content: contentType;
};

export default function ContentCard({ content }: Readonly<ContentCardProps>) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/content/${content.id}`)} cursor="pointer">
      <CardHeader
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={2}
      >
        <ContentTypeIcon contentType={content.contentType} />
        <Heading size="md">
          <ContentTitle content={content} />
        </Heading>
      </CardHeader>
    </Card>
  );
}
