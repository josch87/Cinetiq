import { contentType } from "../../../model/contentModel.ts";
import { Box } from "@chakra-ui/react";
import ContentPrimaryView from "../ContentPrimaryView/ContentPrimaryView.tsx";

type ContentDetailsBodyProps = {
  content: contentType;
};

export default function ContentDetailsBody({
  content,
}: Readonly<ContentDetailsBodyProps>) {
  return (
    <Box height="100%">
      <ContentPrimaryView content={content} />
    </Box>
  );
}
