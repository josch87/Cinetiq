import NavigationSidebar from "../../components/NavigationSidebar/NavigationSidebar.tsx";
import { Box, Flex } from "@chakra-ui/react";
import { GithubUserAuthType } from "../../model/githubModel.ts";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.tsx";
import { Outlet } from "react-router-dom";

type SidebarPageTemplateProps = {
  user: GithubUserAuthType | null | undefined;
};
export default function SidebarPageTemplate({
  user,
}: Readonly<SidebarPageTemplateProps>) {
  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <NavigationSidebar user={user} />
        <Outlet />
      </Flex>
    </Box>
  );
}
