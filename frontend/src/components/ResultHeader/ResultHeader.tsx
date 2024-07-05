import { Card, Skeleton } from "@chakra-ui/react";
import { InfoType } from "../../model/apiModel.ts";

type ContentFilterResultHeaderProps = {
  info: InfoType | undefined;
  isLoading: boolean;
};

function pluralizeResults(count: number) {
  return `${count} ${count === 1 ? "result" : "results"}`;
}

export default function ResultHeader({
  info,
  isLoading,
}: Readonly<ContentFilterResultHeaderProps>) {
  return (
    <Card bgColor="gray.100" mb={4} fontSize="sm" p={2}>
      <Skeleton noOfLines={1} fitContent isLoaded={!isLoading}>
        <span>{pluralizeResults(info?.count ?? 0)}</span>
      </Skeleton>
    </Card>
  );
}
