import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { contentType } from "../../model/contentModel.ts";

type ContentDetailsHeaderProps = {
  content: contentType;
};

export default function ContentDetailsHeader({
  content,
}: Readonly<ContentDetailsHeaderProps>) {
  return (
    <Box as="section" pb={{ base: "12", md: "24" }}>
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
            <Heading fontSize="xl" fontWeight="bold">
              {content.englishTitle}
            </Heading>
            <Text textStyle="sm" color="fg.muted">
              A new version is available. Please upgrade for the best
              experience.
            </Text>
          </Stack>
          <Button>Download</Button>
        </Stack>
      </Box>
    </Box>
  );
}