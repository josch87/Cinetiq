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
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useContentCreationDrawerStore } from "../../../store/store.ts";
import { Controller, useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { contentType } from "../../../model/contentModel.ts";
import { useRef } from "react";

export default function ContentCreationDrawer() {
  const { isOpen, onClose } = useContentCreationDrawerStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      contentType: "",
      englishTitle: "",
      germanTitle: "",
      originalTitle: "",
    },
  });
  const toast = useToast();
  const navigate = useNavigate();
  const firstField = useRef<HTMLSelectElement>(null);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="lg"
      initialFocusRef={firstField}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading fontSize="2xl" color="teal.600">
            Create new content
          </Heading>
        </DrawerHeader>

        <DrawerBody>
          <Box
            as="form"
            noValidate
            id="create-content-form"
            onSubmit={handleSubmit((data) => {
              axios
                .post("/api/content", data)
                .then((response: AxiosResponse<contentType>) => {
                  toast({
                    title: "Success",
                    description: "Created content",
                    status: "success",
                    isClosable: true,
                  });
                  navigate(`/content/${response.data.id}`);
                  onClose();
                  reset();
                })
                .catch((error) => {
                  console.error(error.message);
                });
            })}
          >
            <Stack spacing={5}>
              <FormControl isInvalid={!!errors.contentType?.message} isRequired>
                <FormLabel>Content Type</FormLabel>
                <Controller
                  name="contentType"
                  control={control}
                  rules={{ required: "You need to specify a type." }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select a type"
                      focusBorderColor="teal.600"
                      ref={firstField}
                    >
                      <option value="MOVIE">Movie</option>
                      <option value="SERIES">Series</option>
                      <option value="EXHIBITION">Exhibition</option>
                    </Select>
                  )}
                />
                <FormHelperText>This can not be changed later.</FormHelperText>
                <FormErrorMessage>
                  {errors.contentType?.message}
                </FormErrorMessage>
              </FormControl>

              <Stack
                as="fieldset"
                px={4}
                pb={4}
                borderWidth={2}
                borderRadius="md"
                spacing={4}
              >
                <FormLabel as="legend" fontSize="lg" color="teal.600">
                  Titles
                </FormLabel>

                <FormControl
                  isInvalid={!!errors.originalTitle?.message}
                  isRequired
                >
                  <FormLabel>Original Title</FormLabel>
                  <Input
                    {...register("originalTitle", {
                      required: "Original title is required.",

                      validate: {
                        notOnlySpaces: (value) =>
                          value.trim() !== "" ||
                          "Title must have at least one visible character.",
                      },
                    })}
                    type="text"
                    focusBorderColor="teal.600"
                  />
                  <FormErrorMessage>
                    {errors.originalTitle?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.englishTitle?.message}>
                  <FormLabel optionalIndicator>English Title</FormLabel>
                  <Input
                    {...register("englishTitle")}
                    type="text"
                    focusBorderColor="teal.600"
                  />
                  <FormErrorMessage>
                    {errors.englishTitle?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.germanTitle?.message}>
                  <FormLabel>German Title</FormLabel>
                  <Input
                    {...register("germanTitle", {
                      minLength: { value: 5, message: "Min lenght is 5" },
                    })}
                    type="text"
                    focusBorderColor="teal.600"
                  />
                  <FormErrorMessage>
                    {errors.germanTitle?.message}
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
          <Button colorScheme="teal" type="submit" form="create-content-form">
            Create
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
