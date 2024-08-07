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
import SidebarButton from "./SidebarButton.tsx";
import {
  FaArrowRightFromBracket,
  FaBorderAll,
  FaBriefcase,
  FaEllipsisVertical,
  FaFilm,
  FaUserGroup,
} from "react-icons/fa6";
import { logout } from "../../services/authService.ts";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo.tsx";
import { GithubUserAuthType } from "../../model/githubModel.ts";
import { useContentCreationDrawerStore } from "../../store/contentStore.ts";
import NavigationSidebarCollapse from "./NavigationSidebarCollapse.tsx";
import { usePersonCreationDrawerStore } from "../../store/personStore.ts";
import { APP_ROUTES } from "../../constants/routes.ts";

type NavigationSidebarProps = {
  user: GithubUserAuthType;
};

export default function NavigationSidebar({
  user,
}: Readonly<NavigationSidebarProps>) {
  const navigate = useNavigate();
  const location = useLocation();
  const onOpenContentCreationDrawer = useContentCreationDrawerStore(
    (state) => state.onOpen
  );
  const onOpenPersonCreationDrawer = usePersonCreationDrawerStore(
    (state) => state.onOpen
  );

  const contentCollapseItems = [
    {
      id: 1,
      title: "All Content",
      onClick: () => {
        navigate(APP_ROUTES.CONTENT);
      },
      path: APP_ROUTES.CONTENT,
    },
    {
      id: 2,
      title: "Create content",
      onClick: onOpenContentCreationDrawer,
    },
  ];

  const peopleCollapseItems = [
    {
      id: 1,
      title: "All people",
      onClick: () => {
        navigate(APP_ROUTES.PEOPLE);
      },
      path: APP_ROUTES.PEOPLE,
    },
    {
      id: 2,
      title: "Create person",
      onClick: onOpenPersonCreationDrawer,
    },
  ];

  const managementCollapseItems = [
    {
      id: 1,
      title: "Staff",
      onClick: () => {
        navigate(APP_ROUTES.STAFF);
      },
      path: APP_ROUTES.STAFF,
    },
  ];

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
          <Logo
            onClick={() => navigate(APP_ROUTES.DASHBOARD)}
            cursor="pointer"
          />

          <Stack spacing="1">
            <SidebarButton
              leftIcon={<FaBorderAll />}
              isCurrentPage={location.pathname === APP_ROUTES.DASHBOARD}
              onClick={() => navigate(APP_ROUTES.DASHBOARD)}
            >
              Dashboard
            </SidebarButton>
            <NavigationSidebarCollapse
              title="Content"
              icon={FaFilm}
              menuItems={contentCollapseItems}
            />
            <NavigationSidebarCollapse
              title="People"
              icon={FaUserGroup}
              menuItems={peopleCollapseItems}
            />
            <NavigationSidebarCollapse
              title="Management"
              icon={FaBriefcase}
              menuItems={managementCollapseItems}
            />
          </Stack>
        </Stack>

        <Stack spacing="4" divider={<StackDivider />}>
          <Stack alignItems="center">
            <Text
              fontSize="xs"
              color="gray.500"
              textTransform="uppercase"
              onClick={() => navigate(APP_ROUTES.ABOUT)}
              cursor="pointer"
            >
              About
            </Text>
          </Stack>
          <HStack spacing="3" justify="space-between">
            <HStack spacing="3">
              <Avatar boxSize="10" src={user.avatarUrl} name={user.name} />
              <Box>
                <Text textStyle="sm" fontWeight="medium">
                  {user.name}
                </Text>
                <Text textStyle="sm" color="fg.muted" fontSize="sm">
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
