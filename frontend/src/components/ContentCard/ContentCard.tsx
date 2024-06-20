import {
  Box,
  Card,
  CardHeader,
  Heading,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { contentType } from "../../model/contentModel.ts";
import { FaFilm, FaVideo } from "react-icons/fa6";
import ContentCardTitle from "./ContentCardTitle.tsx";

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
        {content.contentType === "MOVIE" ? (
          <Tooltip label="Movie">
            <Box display="flex">
              <Icon as={FaFilm} />
            </Box>
          </Tooltip>
        ) : (
          <Tooltip label="Series">
            <Box display="flex">
              <Icon as={FaVideo} />
            </Box>
          </Tooltip>
        )}
        <Heading size="md">
          <ContentCardTitle content={content} />
        </Heading>
      </CardHeader>
    </Card>
  );
}
