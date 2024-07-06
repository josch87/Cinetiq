import { Badge, Skeleton, Td, Tr } from "@chakra-ui/react";

type SkeletonPersonTableRowProps = {
  columnCount?: number;
};

export default function SkeletonPersonTableRow({
  columnCount,
}: Readonly<SkeletonPersonTableRowProps>) {
  return (
    <Tr>
      <Td colSpan={columnCount}>
        <Skeleton>
          Norris
          <Badge size="sm" colorScheme={"green"}>
            "ACTIVE"
          </Badge>
        </Skeleton>
      </Td>
    </Tr>
  );
}
