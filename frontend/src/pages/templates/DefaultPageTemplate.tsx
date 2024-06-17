import NavigationSidebar from "../../components/NavigationSidebar/NavigationSidebar.tsx";
import { ReactNode } from "react";
import { Box, Flex, useColorModeValue as mode } from "@chakra-ui/react";
import { githubUserType } from "../../model/userModel.ts";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.tsx";

type DefaultPageTemplateProps = {
  children: ReactNode;
  user: githubUserType | null | undefined;
};

export default function DefaultPageTemplate({
  children,
  user,
}: DefaultPageTemplateProps) {
  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <NavigationSidebar user={user} />
        <Box bg={mode("white", "gray.800")} flex="1" p="6">
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
    </Box>
  );
}
