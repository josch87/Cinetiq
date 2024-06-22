import { contentType } from "../../../model/contentModel.ts";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ContentScopeboxTitles from "../ContentScopeboxes/ContentScopeboxTitles.tsx";

type ContentDetailsProps = {
  content: contentType;
};

export default function ContentDetails({
  content,
}: Readonly<ContentDetailsProps>) {
  return (
    <Box>
      <Tabs size="md" variant="enclosed" colorScheme="teal">
        <TabList flexWrap="wrap">
          <Tab>Basics</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0} pb={0} display="flex" flexDirection="column" gap={4}>
            <ContentScopeboxTitles content={content} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
