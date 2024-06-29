import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Scopebox from "../../Scopebox/Scopebox.tsx";
import { ContentType } from "../../../model/contentModel.ts";
import styled from "@emotion/styled";
import ContentModalEditTitles from "../ContentModalEditTitles/ContentModalEditTitles.tsx";

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
  const contentModalEditTitlesDisclosure = useDisclosure();

  function handleEdit() {
    contentModalEditTitlesDisclosure.onOpen();
  }

  return (
    <>
      <Scopebox
        heading="Titles"
        onEdit={content.status === "ACTIVE" ? handleEdit : undefined}
      >
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
                <StyledTd>Original title</StyledTd>
                <Td>{content.originalTitle}</Td>
              </Tr>
              <Tr>
                <StyledTd>English title</StyledTd>
                <Td>{content.englishTitle}</Td>
              </Tr>
              <Tr>
                <StyledTd>German title</StyledTd>
                <Td>{content.germanTitle}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Scopebox>
      <ContentModalEditTitles
        disclosure={contentModalEditTitlesDisclosure}
        content={content}
      />
    </>
  );
}
