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
  Button,
  VStack,
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
            <VStack gap={6} alignItems="flex-start">
              <Text>
                Cinetiq is an application designed to help film festival staff
                organize and plan their festivals. With Cinetiq, users can
                manage content such as films, series, and exhibitions, as well
                as handle details for various individuals involved in the
                festival, including film guests, accredited professionals, press
                representatives, and more.
              </Text>
              <Text>
                Version 1.0.0 of Cinetiq was developed by Aljoscha Zöller within
                a four-week timeframe as part of a Java Development Bootcamp at
                neuefische in June/July 2024.
              </Text>
              <Button
                colorScheme="brand"
                leftIcon={<FaGithub />}
                onClick={() =>
                  window.open("https://github.com/josch87/Cinetiq", "_blank")
                }
              >
                Cinetiq on GitHub
              </Button>
            </VStack>
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
