import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Scopebox from "../../Scopebox/Scopebox.tsx";
import { ContentType } from "../../../model/contentModel.ts";
import styled from "@emotion/styled";

type ContentScopeboxTitlesProp = {
  content: ContentType;
};

const StyledTh = styled(Th)`
  padding-left: 2px;
`;

const StyledTd = styled(Td)`
  padding-left: 2px;
`;

export default function ContentScopeboxTitles({
  content,
}: Readonly<ContentScopeboxTitlesProp>) {
  return (
    <Scopebox heading="Titles">
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <StyledTh>Type</StyledTh>
              <Th>Title</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <StyledTd>English title</StyledTd>
              <Td>{content.englishTitle}</Td>
            </Tr>
            <Tr>
              <StyledTd>German title</StyledTd>
              <Td>{content.germanTitle}</Td>
            </Tr>
            <Tr>
              <StyledTd>Original title</StyledTd>
              <Td>{content.originalTitle}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Scopebox>
  );
}
