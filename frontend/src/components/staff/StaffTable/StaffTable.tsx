import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  Link,
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
          <Th>Bio</Th>
          <Th>Registered&nbsp;at</Th>
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
                  <Tooltip label="GitHub Profile">
                    <Link
                      href={appUser.githubUserProfileSynced.html_url}
                      isExternal
                    >
                      {appUser.githubUserProfileSynced.login}
                    </Link>
                  </Tooltip>
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
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
