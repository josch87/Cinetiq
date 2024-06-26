import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContentCreationDrawerStore } from "../../../store/store.ts";
import { Controller, useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { ContentType, NewContentType } from "../../../model/contentModel.ts";
import { useRef } from "react";

export default function ContentCreationDrawer() {
  const {
    isOpen: isContentCreationDrawerOpen,
    onClose: onContentCreationDrawerClose,
  } = useContentCreationDrawerStore();
  const {
    isOpen: isCancelAlertDialogOpen,
    onClose: onCancelAlertDialogClose,
    onOpen: onCancelAlertDialogOpen,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm<NewContentType>({
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
  const firstDrawerField = useRef<HTMLSelectElement>(null);
  const firstCancelAlertDialogField = useRef<HTMLButtonElement>(null);

  function handleFormSubmit(data: NewContentType) {
    axios
      .post("/api/content", data)
      .then((response: AxiosResponse<ContentType>) => {
        toast({
          title: "Success",
          description: "Created content",
          status: "success",
          isClosable: true,
        });
        navigate(`/content/${response.data.id}`);
        onContentCreationDrawerClose();
        reset();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function handleConfirmedCancel() {
    onCancelAlertDialogClose();
    reset();
    onContentCreationDrawerClose();
  }

  return (
    <Drawer
      isOpen={isContentCreationDrawerOpen}
      placement="right"
      onClose={onContentCreationDrawerClose}
      size="lg"
      initialFocusRef={firstDrawerField}
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
            onSubmit={handleSubmit(handleFormSubmit)}
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
                      ref={firstDrawerField}
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
                    {...register("germanTitle")}
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
          <Button
            variant="outline"
            mr={3}
            onClick={() => {
              if (isDirty) {
                onCancelAlertDialogOpen();
              } else {
                onContentCreationDrawerClose();
                reset();
              }
            }}
          >
            Cancel
          </Button>
          <Button colorScheme="teal" type="submit" form="create-content-form">
            Create
          </Button>
        </DrawerFooter>
      </DrawerContent>

      <AlertDialog
        leastDestructiveRef={firstCancelAlertDialogField}
        isOpen={isCancelAlertDialogOpen}
        onClose={onCancelAlertDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Content Creation
            </AlertDialogHeader>

            <AlertDialogBody>
              <Stack spacing={4}>
                <Text>
                  Are you sure you want to cancel creating new content? All
                  entered data will be lost.
                </Text>
                <Text as="em" fontSize="xs">
                  Hint: If you wish to continue at a later time consider only
                  closing the drawer instead.
                </Text>
              </Stack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={firstCancelAlertDialogField}
                onClick={onCancelAlertDialogClose}
              >
                No
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleConfirmedCancel}>
                Yes, Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Drawer>
  );
}
