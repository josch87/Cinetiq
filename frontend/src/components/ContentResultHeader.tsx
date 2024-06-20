import { Card, Skeleton, Text } from "@chakra-ui/react";
import { infoType } from "../model/contentModel.ts";

type ContentFilterResultHeaderProps = {
  info: infoType | undefined;
};

function pluralizeResults(count: number) {
  return `${count} ${count === 1 ? "result" : "results"}`;
}

export default function ContentResultHeader({
  info,
}: ContentFilterResultHeaderProps) {
  if (info === undefined) {
    return (
      <Card bgColor="gray.100" mb={4} fontSize="sm" p={2}>
        <Skeleton noOfLines={1} fitContent>
          <Text>{pluralizeResults(3)}</Text>
        </Skeleton>
      </Card>
    );
  }
  return (
    <Card bgColor="gray.100" mb={4} fontSize="sm" p={2}>
      <span>{pluralizeResults(info.count)}</span>
    </Card>
  );
}
