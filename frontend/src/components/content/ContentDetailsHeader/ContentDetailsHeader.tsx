import { Box, Heading, HStack, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ContentType } from "../../../model/contentModel.ts";
import ContentTypeIcon from "../ContentTypeIcon/ContentTypeIcon.tsx";
import ContentTitle from "../ContentTitle/ContentTitle.tsx";
import ContentDetailsActions from "../ContentDetailsActions/ContentDetailsActions.tsx";
import ContentStatus from "../ContentStatus/ContentStatus.tsx";

type ContentDetailsHeaderProps = {
  content: ContentType;
  isLoading: boolean;
};

export default function ContentDetailsHeader({
  content,
  isLoading,
}: Readonly<ContentDetailsHeaderProps>) {
  return (
    <Box as="section" pb={{ base: "12", md: "4" }}>
      <Box
        bg="bg.surface"
        bgColor="white"
        px={{ base: "4", md: "6" }}
        py="5"
        boxShadow="sm"
        borderRadius="lg"
      >
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing="4"
          justify="space-between"
        >
          <Stack spacing="1">
            <Stack flexDirection="row" alignItems="center">
              <Skeleton isLoaded={!isLoading}>
                <ContentTypeIcon contentType={content.contentType} />
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Heading fontSize="xl" fontWeight="bold">
                  <ContentTitle content={content} />
                </Heading>
              </Skeleton>
            </Stack>
            <Skeleton isLoaded={!isLoading}>
              <Text textStyle="sm" color="fg.muted">
                {`Created on ${content.createdAt.toDateString()} by ${content.createdBy.githubUserProfileSynced.name ? content.createdBy.githubUserProfileSynced.name : content.createdBy.githubUserProfileSynced.login}`}
              </Text>
            </Skeleton>
          </Stack>
          <HStack gap={6}>
            <ContentStatus content={content} />
            <ContentDetailsActions content={content} />
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}
