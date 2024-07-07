import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Skeleton,
  Tooltip,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaEdit } from "react-icons/fa";

type ScopeboxProps = {
  children: ReactNode;
  heading: string;
  onEdit?: () => void;
  isLoading: boolean;
};

export default function Scopebox({
  children,
  heading,
  onEdit,
  isLoading,
}: Readonly<ScopeboxProps>) {
  return (
    <Skeleton isLoaded={!isLoading}>
      <Card>
        <CardHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading fontSize="md">{heading}</Heading>
          {onEdit && (
            <Tooltip label="Edit">
              <IconButton
                aria-label="Edit"
                size="xs"
                icon={<FaEdit />}
                variant="outline"
                colorScheme="brand"
                onClick={onEdit}
              />
            </Tooltip>
          )}
        </CardHeader>
        <CardBody pt={0}>{children}</CardBody>
      </Card>
    </Skeleton>
  );
}
