import NavigationSidebar from "../../components/NavigationSidebar/NavigationSidebar.tsx";
import { ReactNode } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue as mode,
  Text,
} from "@chakra-ui/react";
import { githubUserType } from "../../model/userModel.ts";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.tsx";

type DefaultPageTemplateProps = {
  children: ReactNode;
  pageTitle: string;
  pageSubtitle: string;
  user: githubUserType | null | undefined;
};

export default function DefaultPageTemplate({
  children,
  pageTitle,
  pageSubtitle,
  user,
}: DefaultPageTemplateProps) {
  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <NavigationSidebar user={user} />
        <Flex direction="column" width="100%">
          <Flex borderBottomWidth="1px">
            <Box
              as="section"
              bg="bg.surface"
              pt={{ base: "4", md: "4" }}
              pb={{ base: "4", md: "2" }}
            >
              <Container>
                <Stack spacing="1">
                  <Heading size={{ base: "xs", md: "lg" }} fontWeight="medium">
                    {pageTitle}
                  </Heading>
                  <Text color="fg.muted">{pageSubtitle}</Text>
                </Stack>
              </Container>
            </Box>
          </Flex>
          <Box bg={mode("white", "gray.800")} flex="1" p="4">
            <Box
              w="full"
              h="full"
              rounded="lg"
              border="3px dashed currentColor"
              color={mode("gray.200", "gray.700")}
            >
              {children}
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
