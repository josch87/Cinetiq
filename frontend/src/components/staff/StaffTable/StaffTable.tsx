import {
  Checkbox,
  HStack,
  Icon,
  Table,
  TableProps,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IoArrowDown } from "react-icons/io5";
import { AppUserType } from "../../../model/userModel.ts";
import StaffTableRow from "./StaffTableRow.tsx";
import { appUser1 } from "../../../model/userTestData.ts";

type StaffTableProps = {
  tableProps?: TableProps;
  appUsers: AppUserType[];
  isLoading: boolean;
};

export default function StaffTable({
  tableProps,
  appUsers,
  isLoading,
}: Readonly<StaffTableProps>) {
  const sortedAppUsers = appUsers
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <Table {...tableProps} bgcolor="white" borderRadius="md">
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <Checkbox />
              <Text>Name</Text>
            </HStack>
          </Th>
          <Th>Status</Th>
          <Th>Email</Th>
          <Th>Bio</Th>
          <Th>
            <HStack spacing="1">
              <Text>Registered&nbsp;at</Text>
              <Icon as={IoArrowDown} color="fg.muted" boxSize="4" />
            </HStack>
          </Th>
          <Th>Last&nbsp;sync</Th>
        </Tr>
      </Thead>
      <Tbody>
        {isLoading
          ? Array.from({ length: 5 }, (_, index) => (
              <StaffTableRow
                key={index}
                appUser={appUser1}
                isLoading={isLoading}
              />
            ))
          : sortedAppUsers.map((appUser) => (
              <StaffTableRow
                key={appUser.id}
                appUser={appUser}
                isLoading={isLoading}
              />
            ))}
      </Tbody>
    </Table>
  );
}
