import { ContentType } from "../../../model/contentModel.ts";
import { Grid, Skeleton } from "@chakra-ui/react";
import ContentPrimaryView from "../ContentPrimaryView/ContentPrimaryView.tsx";
import ContentDetailsTabs from "../ContentDetailsTabs/ContentDetailsTabs.tsx";

type ContentDetailsBodyProps = {
  content: ContentType;
  isLoading: boolean;
};

export default function ContentDetailsBody({
  content,
  isLoading,
}: Readonly<ContentDetailsBodyProps>) {
  return (
    <Grid templateColumns="2fr 3fr" gap={4}>
      <Skeleton isLoaded={!isLoading}>
        <ContentPrimaryView content={content} />
      </Skeleton>
      <ContentDetailsTabs content={content} isLoading={isLoading} />
    </Grid>
  );
}
