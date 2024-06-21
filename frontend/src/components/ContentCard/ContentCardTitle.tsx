import { contentType } from "../../model/contentModel.ts";
import { forwardRef, LinkOverlay, Tooltip } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

type ContentCardTitleProps = {
  content: contentType;
};

export default function ContentCardTitle({
  content,
}: Readonly<ContentCardTitleProps>) {
  const RenderedLinkOverlay = forwardRef((_, ref) => (
    <LinkOverlay ref={ref} as={ReactRouterLink} to={`/content/${content.id}`}>
      {content.englishTitle}
    </LinkOverlay>
  ));

  if (content.englishTitle) {
    return (
      <Tooltip hasArrow label="English title">
        <RenderedLinkOverlay />
      </Tooltip>
    );
  } else if (content.germanTitle) {
    return (
      <Tooltip
        hasArrow
        label="German title"
        onMouseOver={(event) => event.stopPropagation()}
      >
        <LinkOverlay as={ReactRouterLink} to={`/content/${content.id}`}>
          {content.germanTitle}
        </LinkOverlay>
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
