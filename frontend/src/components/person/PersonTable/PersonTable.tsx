import {
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
import { PersonType } from "../../../model/personModel.ts";
import { IoArrowDown } from "react-icons/io5";
import PersonTableRow from "./PersonTableRow.tsx";
import SkeletonPersonTableRow from "./SkeletonPersonTableRow.tsx";

type PersonTableProps = {
  tableProps?: TableProps;
  people: PersonType[];
  isLoading: boolean;
};

export default function PersonTable({
  tableProps,
  people,
  isLoading,
}: Readonly<PersonTableProps>) {
  const sortedPeople = people
    .slice()
    .sort((a, b) => {
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return 1;
      } else if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1;
      } else return 0;
    })
    .sort((a, b) => {
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
        return 1;
      } else if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
        return -1;
      } else return 0;
    });

  return (
    <Table {...tableProps} bgcolor="white" borderRadius="md">
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="1">
              <Text>Last&nbsp;name</Text>
              <Icon as={IoArrowDown} color="fg.muted" boxSize="4" />
            </HStack>
          </Th>
          <Th>First&nbsp;name</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {isLoading
          ? Array.from({ length: 5 }, (_, index) => (
              <SkeletonPersonTableRow key={index} columnCount={3} />
            ))
          : sortedPeople.map((person) => (
              <PersonTableRow key={person.id} person={person} />
            ))}
      </Tbody>
    </Table>
  );
}
