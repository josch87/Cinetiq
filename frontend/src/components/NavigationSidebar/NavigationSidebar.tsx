import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import {
  FiBookmark,
  FiClock,
  FiGrid,
  FiHelpCircle,
  FiPieChart,
  FiSearch,
  FiSettings,
} from "react-icons/fi";
import { Logo } from "../Logo/Logo.tsx";
import { DocumentCollapse } from "./DocumentCollapse.tsx";
import { SidebarButton } from "./SidebarButton.tsx";
import { githubUserType } from "../../model/userModel.ts";
import { FaEllipsisVertical } from "react-icons/fa6";

type NavigationSidebarProps = {
  user: githubUserType;
};

export default function NavigationSidebar({ user }: NavigationSidebarProps) {
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
          <Logo alignSelf="start" />
          <InputGroup>
            <InputLeftElement>
              <Icon as={FiSearch} color="fg.muted" fontSize="lg" />
            </InputLeftElement>
            <Input placeholder="Search" />
          </InputGroup>
          <Stack spacing="1">
            <SidebarButton leftIcon={<FiGrid />}>Dashboard</SidebarButton>
            <SidebarButton leftIcon={<FiPieChart />}>Analysis</SidebarButton>
            <DocumentCollapse />
            <SidebarButton leftIcon={<FiClock />}>History</SidebarButton>
            <SidebarButton leftIcon={<FiBookmark />}>Favorites</SidebarButton>
          </Stack>
        </Stack>
        <Stack spacing="4" divider={<StackDivider />}>
          <Box />
          <Stack spacing="1">
            <SidebarButton leftIcon={<FiHelpCircle />}>
              Help Center
            </SidebarButton>
            <SidebarButton leftIcon={<FiSettings />}>Settings</SidebarButton>
          </Stack>
          <HStack spacing="3" justify="space-between">
            <HStack spacing="3">
              <Avatar boxSize="10" src={user.avatarUrl} />
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
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
            <IconButton
              variant="tertiary"
              icon={<FaEllipsisVertical />}
              aria-label="Open Menu"
            />
          </HStack>
        </Stack>
      </Stack>
    </Flex>
  );
}
