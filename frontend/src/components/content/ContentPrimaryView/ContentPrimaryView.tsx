import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { contentType } from "../../../model/contentModel.ts";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { githubUserType } from "../../../model/userModel.ts";

type ContentPrimaryViewProps = {
  content: contentType;
};

const StyledTd = styled(Td)`
  padding-left: 2px;
  font-weight: bold;
  width: 1%;
`;

export default function ContentPrimaryView({
  content,
}: Readonly<ContentPrimaryViewProps>) {
  const [contentAuthor, setContentAuthor] = useState<githubUserType>();

  useEffect(() => {
    axios
      .get("https://api.github.com/user/" + content.createdBy.githubId)
      .then((response) => {
        setContentAuthor(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="sm">
          Primary View
        </Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading as="h4" size="xs" textTransform="uppercase" mb={2}>
              Titles
            </Heading>
            <TableContainer>
              <Table variant="unstyled" size="sm">
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
          </Box>
          <Box>
            <Heading as="h4" size="xs" textTransform="uppercase" mb={2}>
              Created
            </Heading>
            <TableContainer>
              <Table variant="unstyled" size="sm">
                <Tbody>
                  <Tr>
                    <StyledTd>Date created</StyledTd>
                    <Td>
                      {content.createdAt.toDateString()},{" "}
                      {content.createdAt.toLocaleTimeString()}
                    </Td>
                  </Tr>
                  <Tr>
                    <StyledTd>Created by</StyledTd>
                    <Td>{contentAuthor?.name} in Cinetiq</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
