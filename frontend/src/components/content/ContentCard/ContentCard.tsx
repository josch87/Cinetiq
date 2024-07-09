import { Card, CardHeader, Heading } from "@chakra-ui/react";
import { ContentType } from "../../../model/contentModel.ts";
import ContentTitle from "../ContentTitle/ContentTitle.tsx";
import ContentTypeIcon from "../ContentTypeIcon/ContentTypeIcon.tsx";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants/routes.ts";

type ContentCardProps = {
  content: ContentType;
};

export default function ContentCard({ content }: Readonly<ContentCardProps>) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`${APP_ROUTES.CONTENT}/${content.id}`)}
      cursor="pointer"
    >
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
