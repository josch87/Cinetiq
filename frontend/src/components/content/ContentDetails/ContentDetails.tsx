import { contentType } from "../../../model/contentModel.ts";
import {
  Card,
  CardHeader,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Scopebox from "../../Scopebox/Scopebox.tsx";

type ContentDetailsProps = {
  content: contentType;
};

export default function ContentDetails({
  content,
}: Readonly<ContentDetailsProps>) {
  return (
    <Card>
      <CardHeader>
        <Tabs size="sm" variant="enclosed" colorScheme="teal">
          <TabList>
            <Tab>Basics</Tab>
            <Tab>Cast & Crew</Tab>
            <Tab>Video</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Scopebox heading="Titles">
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Type</Th>
                        <Th>Title</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>English title</Td>
                        <Td>{content.englishTitle}</Td>
                      </Tr>
                      <Tr>
                        <Td>German title</Td>
                        <Td>{content.germanTitle}</Td>
                      </Tr>
                      <Tr>
                        <Td>Original title</Td>
                        <Td>{content.originalTitle}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Scopebox>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardHeader>
    </Card>
  );
}
