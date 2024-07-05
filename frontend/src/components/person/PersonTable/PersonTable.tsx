import {
  Badge,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { PersonType } from "../../../model/personModel.ts";
import { IoArrowDown } from "react-icons/io5";

type PersonTableProps = {
  tableProps?: TableProps;
  people: PersonType[];
};

export default function PersonTable({
  tableProps,
  people,
}: Readonly<PersonTableProps>) {
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
        {people
          .slice()
          .sort((a, b) => {
            if (a.firstName > b.firstName) {
              return 1;
            } else if (a.firstName < b.firstName) {
              return -1;
            } else return 0;
          })
          .sort((a, b) => {
            if (a.lastName > b.lastName) {
              return 1;
            } else if (a.lastName < b.lastName) {
              return -1;
            } else return 0;
          })
          .map((person) => (
            <LinkBox as="tr" key={person.id}>
              <Td>
                <LinkOverlay
                  as={RouterLink}
                  to={`/people/${person.id}`}
                  fontWeight="medium"
                >
                  {person.lastName}
                </LinkOverlay>
              </Td>
              <Td>
                <Text fontWeight="medium">{person.firstName}</Text>
              </Td>
              <Td>
                <Badge
                  size="sm"
                  colorScheme={person.status === "ACTIVE" ? "green" : "red"}
                >
                  {person.status}
                </Badge>
              </Td>
            </LinkBox>
          ))}
      </Tbody>
    </Table>
  );
}
