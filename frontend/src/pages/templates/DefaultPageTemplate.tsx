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
import { GithubUserType } from "../../model/userModel.ts";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.tsx";

type DefaultPageTemplateProps = {
  children: ReactNode;
  pageTitle: string;
  pageSubtitle: string;
  user: GithubUserType | null | undefined;
  warning?: boolean;
};

export default function DefaultPageTemplate({
  children,
  pageTitle,
  pageSubtitle,
  user,
  warning,
}: Readonly<DefaultPageTemplateProps>) {
  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <NavigationSidebar user={user} />
        <Flex direction="column" width="100%">
          <Flex as="header" borderBottomWidth="1px">
            <Box
              as="section"
              bg="bg.surface"
              pt={{ base: "2", md: "2" }}
              pb={{ base: "2", md: "2" }}
            >
              <Container>
                <Stack spacing="1">
                  <Heading
                    as="h1"
                    size={{ base: "sm", md: "lg" }}
                    fontWeight="medium"
                  >
                    {pageTitle}
                  </Heading>
                  <Text color="fg.muted" fontSize={{ base: "xs", md: "sm" }}>
                    {pageSubtitle}
                  </Text>
                </Stack>
              </Container>
            </Box>
          </Flex>
          <Box
            as="main"
            bg={warning ? "red.50" : mode("gray.50", "gray.800")}
            flex="1"
            p="4"
            overflowY="auto"
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
