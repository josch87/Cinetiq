import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useContentCreationDrawerStore } from "../../../store/store.ts";

export default function ContentCreationDrawer() {
  const { isOpen, onClose } = useContentCreationDrawerStore();

  function handleCreateContent() {
    console.log("Content created");
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create new content</DrawerHeader>

        <DrawerBody>
          <Box as="form">
            <Stack spacing={5}>
              <FormControl isRequired>
                <FormLabel color="teal.500">Content Type</FormLabel>
                <Select placeholder="Select a type">
                  <option value="MOVIE">Movie</option>
                  <option value="SERIES">Series</option>
                  <option value="EXHIBITION">Exhibition</option>
                </Select>
              </FormControl>
              <Stack
                as="fieldset"
                px={4}
                pb={4}
                borderWidth={2}
                borderRadius="md"
                spacing={4}
              >
                <FormLabel as="legend" fontSize="lg" color="teal.500">
                  Titles
                </FormLabel>
                <FormControl id="englishTitle" isRequired>
                  <FormLabel>English Title</FormLabel>
                  <Input type="text" />
                  <FormErrorMessage>English title is required</FormErrorMessage>
                </FormControl>{" "}
                <FormControl id="germanTitle" isRequired>
                  <FormLabel>German Title</FormLabel>
                  <Input type="text" />
                  <FormErrorMessage>German title is required</FormErrorMessage>
                </FormControl>{" "}
                <FormControl id="originalTitle" isRequired>
                  <FormLabel>Original Title</FormLabel>
                  <Input type="text" />
                  <FormErrorMessage>
                    Original title is required
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </Stack>
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleCreateContent}>
            Create
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
