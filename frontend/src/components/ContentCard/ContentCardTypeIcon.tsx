import { Box, Icon, Tooltip } from "@chakra-ui/react";
import { FaFilm, FaTv } from "react-icons/fa6";
import { contentTypeEnum } from "../../model/contentModel.ts";
import { FaPaintBrush } from "react-icons/fa";

type ContentCardTypeIconProps = {
  contentType: contentTypeEnum;
};

export default function ContentCardTypeIcon({
  contentType,
}: ContentCardTypeIconProps) {
  if (contentType === "MOVIE") {
    return (
      <Tooltip label="Movie">
        <Box display="flex">
          <Icon as={FaFilm} />
        </Box>
      </Tooltip>
    );
  }

  if (contentType === "SERIES") {
    return (
      <Tooltip label="Series">
        <Box display="flex">
          <Icon as={FaTv} />
        </Box>
      </Tooltip>
    );
  }

  if (contentType === "EXHIBITION") {
    return (
      <Tooltip label="Exhibition">
        <Box display="flex">
          <Icon as={FaPaintBrush} />
        </Box>
      </Tooltip>
    );
  }

  console.error("Content type is unknown");

  return (
    <Tooltip label="Unknown content type">
      <Box display="flex">
        <Icon />
      </Box>
    </Tooltip>
  );
}
