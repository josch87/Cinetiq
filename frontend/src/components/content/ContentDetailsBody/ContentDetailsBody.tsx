import { contentType } from "../../../model/contentModel.ts";
import { Grid } from "@chakra-ui/react";
import ContentPrimaryView from "../ContentPrimaryView/ContentPrimaryView.tsx";
import ContentDetails from "../ContentDetails/ContentDetails.tsx";

type ContentDetailsBodyProps = {
  content: contentType;
};

export default function ContentDetailsBody({
  content,
}: Readonly<ContentDetailsBodyProps>) {
  return (
    <Grid templateColumns="2fr 3fr" gap={4}>
      <ContentPrimaryView content={content} />
      <ContentDetails content={content} />
    </Grid>
  );
}
