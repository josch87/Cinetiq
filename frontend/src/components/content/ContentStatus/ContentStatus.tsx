import { contentStatusEnum, contentType } from "../../../model/contentModel.ts";
import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { FaBoxArchive, FaCodeMerge, FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { githubUserType } from "../../../model/userModel.ts";
import axios from "axios";

type ContentStatusProps = {
  content: contentType;
};

function getIcon(status: contentStatusEnum) {
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
  const [statusUpdatedByUser, setStatusUpdatedByUser] =
    useState<githubUserType>();

  useEffect(() => {
    if (content.statusUpdatedBy !== null) {
      axios
        .get("https://api.github.com/user/" + content.statusUpdatedBy.githubId)
        .then((response) => {
          setStatusUpdatedByUser(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, []);

  if (content.status === "ACTIVE") {
    return null;
  }

  return (
    <Tooltip
      label={`by ${statusUpdatedByUser?.name} on ${content.statusUpdatedAt?.toDateString()}, ${content.statusUpdatedAt?.toLocaleTimeString()}`}
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
