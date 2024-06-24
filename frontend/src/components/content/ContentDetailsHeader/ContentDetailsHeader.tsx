import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { contentType } from "../../../model/contentModel.ts";
import ContentTypeIcon from "../ContentTypeIcon/ContentTypeIcon.tsx";
import ContentTitle from "../ContentTitle/ContentTitle.tsx";
import ContentDetailsActions from "../ContentDetailsActions/ContentDetailsActions.tsx";
import ContentStatus from "../ContentStatus/ContentStatus.tsx";

type ContentDetailsHeaderProps = {
  content: contentType;
};

export default function ContentDetailsHeader({
  content,
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
              <ContentTypeIcon contentType={content.contentType} />
              <Heading fontSize="xl" fontWeight="bold">
                <ContentTitle content={content} />
              </Heading>
            </Stack>
            <Text textStyle="sm" color="fg.muted">
              {`Created on ${content.createdAt.toDateString()}`}
            </Text>
          </Stack>
          <HStack gap={6}>
            <ContentStatus content={content} />
            <ContentDetailsActions />
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}
