import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { ContentType } from "../../../model/contentModel.ts";
import { useGithubUserById } from "../../../services/githubService.ts";
import ContentPrimaryViewSection from "../ContentPrimaryViewSection/ContentPrimaryViewSection.tsx";

type ContentPrimaryViewProps = {
  content: ContentType;
};

export default function ContentPrimaryView({
  content,
}: Readonly<ContentPrimaryViewProps>) {
  const { githubUser: contentAuthor } = useGithubUserById(
    content.createdBy.githubId
  );

  const { githubUser: statusUpdatedByGithubUser } = useGithubUserById(
    content.statusUpdatedBy?.githubId
  );

  const titlesData = [
    { label: "English title", value: content.englishTitle },
    { label: "German title", value: content.germanTitle },
    { label: "Original title", value: content.originalTitle },
  ];

  const createdData = [
    {
      label: "Created at",
      value: `${content.createdAt.toDateString()}, ${content.createdAt.toLocaleTimeString()}`,
    },
    { label: "Created by", value: `${contentAuthor?.name} in Cinetiq` },
  ];

  const statusData = [
    {
      label: "Status",
      value: <Text color="red">{content.status}</Text>,
    },
    {
      label: "Updated at",
      value: `${content.statusUpdatedAt?.toDateString()}, ${content.statusUpdatedAt?.toLocaleTimeString()}`,
    },
    { label: "Updated by", value: statusUpdatedByGithubUser?.name },
  ];

  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="sm">
          Primary View
        </Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Stack divider={<StackDivider />} spacing="4">
          <ContentPrimaryViewSection heading="titles" tableData={titlesData} />
          <ContentPrimaryViewSection
            heading="Created"
            tableData={createdData}
          />
          {content.status !== "ACTIVE" && (
            <ContentPrimaryViewSection
              heading="Status"
              tableData={statusData}
            />
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
