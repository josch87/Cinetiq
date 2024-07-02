import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";
import { AppUserType } from "../../../model/userModel.ts";

type StaffTableProps = {
  tableProps?: TableProps;
  appUsers: AppUserType[];
};

export default function StaffTable({
  tableProps,
  appUsers,
}: Readonly<StaffTableProps>) {
  return (
    <Table {...tableProps}>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <Checkbox />
              <HStack spacing="1">
                <Text>Name</Text>
                <Icon as={IoArrowDown} color="fg.muted" boxSize="4" />
              </HStack>
            </HStack>
          </Th>
          <Th>Status</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Registered&nbsp;at</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {appUsers.map((appUser) => (
          <Tr key={appUser.id}>
            <Td>
              <HStack spacing="3">
                <Checkbox />
                <Avatar
                  name={appUser.githubUserProfileSynced.name}
                  src={appUser.githubUserProfileSynced.avatar_url}
                  boxSize="10"
                />
                <Box>
                  <Text fontWeight="medium">
                    {appUser.githubUserProfileSynced.name}
                  </Text>
                  <Text color="fg.muted">
                    {appUser.githubUserProfileSynced.login}
                  </Text>
                </Box>
              </HStack>
            </Td>
            <Td>
              {
                <Badge
                  size="sm"
                  colorScheme={appUser.status === "ACTIVE" ? "green" : "red"}
                >
                  {appUser.status}
                </Badge>
              }
            </Td>
            <Td>
              <Text color="fg.muted">
                {appUser.githubUserProfileSynced.email}
              </Text>
            </Td>
            <Td>
              <Text color="fg.muted">
                {appUser.githubUserProfileSynced.bio}
              </Text>
            </Td>
            <Td>
              <Tooltip
                label={`${appUser.createdAt.toDateString()}, ${appUser.createdAt.toLocaleTimeString()}`}
              >
                <Text color="fg.muted">
                  {appUser.createdAt.toLocaleDateString()}
                </Text>
              </Tooltip>
            </Td>
            <Td>
              <HStack spacing="1">
                <IconButton
                  icon={<FiTrash2 />}
                  variant="tertiary"
                  aria-label="Delete member"
                />
                <IconButton
                  icon={<FiEdit2 />}
                  variant="tertiary"
                  aria-label="Edit member"
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
