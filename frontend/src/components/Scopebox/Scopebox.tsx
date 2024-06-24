import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaEdit } from "react-icons/fa";

type ScopeboxProps = {
  children: ReactNode;
  heading: string;
  editable?: boolean;
};

export default function Scopebox({
  children,
  heading,
  editable,
}: Readonly<ScopeboxProps>) {
  return (
    <Card>
      <CardHeader
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading fontSize="md">{heading}</Heading>
        {editable && (
          <Tooltip label="Edit">
            <IconButton
              aria-label="Edit"
              size="xs"
              icon={<FaEdit />}
              variant="outline"
              colorScheme="teal"
            />
          </Tooltip>
        )}
      </CardHeader>
      <CardBody pt={0}>{children}</CardBody>
    </Card>
  );
}
