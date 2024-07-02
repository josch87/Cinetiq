import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { ContentCollapse } from "./collapses/ContentCollapse.tsx";
import { SidebarButton } from "./SidebarButton.tsx";
import {
  FaArrowRightFromBracket,
  FaBorderAll,
  FaEllipsisVertical,
} from "react-icons/fa6";
import { logout } from "../../services/authService.ts";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo.tsx";
import { ManagementCollapse } from "./collapses/ManagementCollapse.tsx";
import { GithubUserAuthType } from "../../model/githubModel.ts";

type NavigationSidebarProps = {
  user: GithubUserAuthType;
};

export default function NavigationSidebar({
  user,
}: Readonly<NavigationSidebarProps>) {
  const navigate = useNavigate();

  return (
    <Flex as="section" minH="100vh">
      <Stack
        flex="1"
        maxW={{ base: "full", sm: "xs" }}
        py={{ base: "6", sm: "8" }}
        px={{ base: "4", sm: "6" }}
        bg="bg.surface"
        borderRightWidth="1px"
        justifyContent="space-between"
      >
        <Stack spacing="8">
          <Logo />

          <Stack spacing="1">
            <SidebarButton
              leftIcon={<FaBorderAll />}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </SidebarButton>
            <ContentCollapse />
            <ManagementCollapse />
          </Stack>
        </Stack>
        <Stack spacing="4" divider={<StackDivider />}>
          <Box />
          <HStack spacing="3" justify="space-between">
            <HStack spacing="3">
              <Avatar boxSize="10" src={user.avatarUrl} name={user.name} />
              <Box>
                <Text textStyle="sm" fontWeight="medium">
                  {user.name}
                </Text>
                <Text textStyle="sm" color="fg.muted">
                  {user.username}
                </Text>
              </Box>
            </HStack>
            <Menu>
              <MenuButton
                as={IconButton}
                variant="tertiary"
                icon={<FaEllipsisVertical />}
                aria-label="Open Menu"
              />
              <MenuList>
                <MenuItem icon={<FaArrowRightFromBracket />} onClick={logout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Stack>
      </Stack>
    </Flex>
  );
}
