import DefaultPageTemplate from "./templates/DefaultPageTemplate.tsx";
import {
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Text,
  Card,
  CardHeader,
  CardBody,
  Grid,
  Heading,
} from "@chakra-ui/react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import styled from "@emotion/styled";

const StyledTable = styled(Table)`
  & td {
    vertical-align: top;
  }
`;

const StyledTd = styled(Td)`
  width: 1px;
  padding-left: 0;
  font-weight: bold;
`;

export default function AboutPage() {
  return (
    <DefaultPageTemplate
      pageTitle="About"
      pageSubtitle="Some information about Cinetiq"
    >
      <Grid gridTemplateColumns="3fr 2fr" gridGap={4}>
        <Card>
          <CardHeader>
            <Heading size="md">History</Heading>
          </CardHeader>
          <CardBody pt={0}>
            <Text mb={6}>
              Version 1.0.0 of Cinetiq was developed as a capstone project as
              part of the Java Fullstack Bootcamp.
            </Text>
            <Link
              href="https://github.com/josch87/Cinetiq"
              isExternal
              display="flex"
              alignItems="center"
            >
              <Text mr={2}>Cinetiq on</Text>
              <FaGithub />
              <Text ml={1}>GitHub</Text>
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Credits</Heading>
          </CardHeader>
          <CardBody pt={0}>
            <TableContainer>
              <StyledTable size="sm" variant="unstyled">
                <Tbody>
                  <Tr>
                    <StyledTd>Development</StyledTd>
                    <Td>
                      <Link
                        href="https://github.com/josch87"
                        isExternal
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <FaArrowUpRightFromSquare />
                        Aljoscha Zöller
                      </Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <StyledTd>Logo Design</StyledTd>
                    <Td>
                      <Text>
                        <Link
                          href="https://nastassiavolkus.com/"
                          isExternal
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <FaArrowUpRightFromSquare />
                          Nastassia Volkus
                        </Link>
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <StyledTd>Special thanks to</StyledTd>
                    <Td display="flex" flexDirection="column" gap={2}>
                      <Link
                        href="https://github.com/Flooooooooooorian"
                        isExternal
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <FaArrowUpRightFromSquare />
                        Florian Weber
                      </Link>
                      <Link
                        href="https://github.com/bitbytejoy"
                        isExternal
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <FaArrowUpRightFromSquare />
                        Elvedin Turkovic
                      </Link>
                      <Link
                        href="https://github.com/mpagels"
                        isExternal
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <FaArrowUpRightFromSquare />
                        Martin Pagels
                      </Link>
                    </Td>
                  </Tr>
                </Tbody>
              </StyledTable>
            </TableContainer>
          </CardBody>
        </Card>
      </Grid>
    </DefaultPageTemplate>
  );
}
