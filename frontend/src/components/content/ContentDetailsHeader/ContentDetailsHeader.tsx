import { Box, Heading, HStack, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ContentType } from "../../../model/contentModel.ts";
import ContentTypeIcon from "../ContentTypeIcon/ContentTypeIcon.tsx";
import ContentTitle from "../ContentTitle/ContentTitle.tsx";
import ContentDetailsActions from "../ContentDetailsActions/ContentDetailsActions.tsx";
import ContentStatus from "../ContentStatus/ContentStatus.tsx";
import { contentMovie } from "../../../model/contentTestData.ts";

type ContentDetailsHeaderProps = {
  content?: ContentType;
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
                <ContentTypeIcon
                  contentType={
                    content ? content.contentType : contentMovie.contentType
                  }
                />
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Heading fontSize="xl" fontWeight="bold">
                  <ContentTitle content={content || contentMovie} />
                </Heading>
              </Skeleton>
            </Stack>
            <Skeleton isLoaded={!isLoading}>
              <Text textStyle="sm" color="fg.muted">
                {content
                  ? `Created on ${content.createdAt.toDateString()} by ${content.createdBy.githubUserProfileSynced.name || content.createdBy.githubUserProfileSynced.login}`
                  : "Created on Fri Jun 28 2024 by Chuck Norris"}
              </Text>
            </Skeleton>
          </Stack>
          <HStack gap={6}>
            <ContentStatus content={content || contentMovie} />
            <ContentDetailsActions
              content={content || contentMovie}
              isLoading={isLoading}
            />
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}
