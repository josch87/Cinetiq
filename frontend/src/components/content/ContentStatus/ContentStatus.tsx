import { ContentStatusEnum, ContentType } from "../../../model/contentModel.ts";
import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { FaBoxArchive, FaCodeMerge, FaTrash } from "react-icons/fa6";

type ContentStatusProps = {
  content: ContentType;
};

function getIcon(status: ContentStatusEnum) {
  switch (status) {
    case "DELETED":
      return <Icon as={FaTrash} color="red" />;
    case "MERGED":
      return <Icon as={FaCodeMerge} color="red" />;
    case "ARCHIVED":
      return <Icon as={FaBoxArchive} color="red" />;
    default:
      return null;
  }
}

export default function ContentStatus({
  content,
}: Readonly<ContentStatusProps>) {
  if (content.status === "ACTIVE") {
    return null;
  }

  return (
    <Tooltip
      label={`by 
      ${
        content.statusUpdatedBy?.githubUserProfileSynced.name
          ? content.statusUpdatedBy?.githubUserProfileSynced.name
          : content.statusUpdatedBy?.githubUserProfileSynced.login
      } 
      on ${content.statusUpdatedAt?.toDateString()}, ${content.statusUpdatedAt?.toLocaleTimeString()}`}
    >
      <Flex gap={2} alignItems="center" border="1px solid red" px={2} py={1}>
        {getIcon(content.status)}
        <Text as="strong" color="red">
          {content.status}
        </Text>
      </Flex>
    </Tooltip>
  );
}
