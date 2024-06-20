import { Card } from "@chakra-ui/react";
import { infoType } from "../model/contentModel.ts";

type ContentFilterResultHeaderProps = {
  info: infoType;
};

function pluralizeResults(count: number) {
  return `${count} ${count === 1 ? "result" : "results"}`;
}

export default function ContentFilterResultHeader({
  info,
}: ContentFilterResultHeaderProps) {
  return (
    <Card bgColor="gray.100" mb={4} fontSize="sm" p={2}>
      {pluralizeResults(info.count)}
    </Card>
  );
}
