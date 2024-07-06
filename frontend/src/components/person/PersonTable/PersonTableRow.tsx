import { Badge, LinkBox, LinkOverlay, Td, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { PersonType } from "../../../model/personModel.ts";

type PersonTableRowProps = {
  person: PersonType;
};

export default function PersonTableRow({
  person,
}: Readonly<PersonTableRowProps>) {
  return (
    <LinkBox as="tr">
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
  );
}
