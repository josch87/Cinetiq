import { Badge, Skeleton, Td, Tr } from "@chakra-ui/react";

type SkeletonTableRowProps = {
  columnCount?: number;
};

export default function SkeletonTableRow({
  columnCount,
}: Readonly<SkeletonTableRowProps>) {
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
