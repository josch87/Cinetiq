import { contentType } from "../../../model/contentModel.ts";
import { Tooltip } from "@chakra-ui/react";

type ContentCardTitleProps = {
  content: contentType;
};

export default function ContentTitle({
  content,
}: Readonly<ContentCardTitleProps>) {
  if (content.englishTitle) {
    return (
      <Tooltip hasArrow label="English title">
        {content.englishTitle}
      </Tooltip>
    );
  } else if (content.germanTitle) {
    return (
      <Tooltip hasArrow label="German title">
        {content.germanTitle}
      </Tooltip>
    );
  } else if (content.originalTitle) {
    return (
      <Tooltip hasArrow label="Original title">
        {content.originalTitle}
      </Tooltip>
    );
  } else {
    return null;
  }
}
