import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReactNode } from "react";

type TableDataType = { label: string; value: string | undefined | ReactNode };

type ContentPrimaryViewSectionProps = {
  heading: string;
  tableData: TableDataType[];
};

const StyledTd = styled(Td)`
  padding-left: 2px;
  font-weight: bold;
  width: 1%;
`;

export default function ContentPrimaryViewSection({
  heading,
  tableData,
}: Readonly<ContentPrimaryViewSectionProps>) {
  return (
    <Box>
      <Heading as="h4" size="xs" textTransform="uppercase" mb={2}>
        {heading}
      </Heading>
      <TableContainer>
        <Table variant="unstyled" size="sm">
          <Tbody>
            {tableData.map((date) => {
              return (
                <Tr key={date.label}>
                  <StyledTd>{date.label}</StyledTd>
                  <Td>{date.value}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
