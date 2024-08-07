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
  Icon,
  Input,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContentCreationDrawerStore } from "../../../store/contentStore.ts";
import { Controller, useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { ContentType, NewContentType } from "../../../model/contentModel.ts";
import { useRef, useState } from "react";
import CancelCreationAlertDialog, {
  CancelAlertDialogDisclosureType,
} from "../../AlertDialogs/CancelCreationAlertDialog/CancelCreationAlertDialog.tsx";
import { ApiResponseType } from "../../../model/apiModel.ts";
import { FaRegSquarePlus } from "react-icons/fa6";
import { APP_ROUTES } from "../../../constants/routes.ts";

export default function ContentCreationDrawer() {
  const toast = useToast();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const firstDrawerField = useRef<HTMLSelectElement>(null);
  const contentCreationDrawerStore = useContentCreationDrawerStore();
  const cancelAlertDialogDisclosure: CancelAlertDialogDisclosureType =
    useDisclosure();
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

  function handleFormSubmit(data: NewContentType) {
    setIsSaving(true);
    axios
      .post("/api/content", data)
      .then((response: AxiosResponse<ApiResponseType<ContentType>>) => {
        toast({
          title: "Success",
          description: "Created content",
          status: "success",
          isClosable: true,
        });
        navigate(`${APP_ROUTES.CONTENT}/${response.data.data.id}`);
        contentCreationDrawerStore.onClose();
        reset();
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  function handleConfirmedCancel() {
    cancelAlertDialogDisclosure.onClose();
    reset();
    contentCreationDrawerStore.onClose();
  }

  return (
    <Drawer
      isOpen={contentCreationDrawerStore.isOpen}
      placement="right"
      onClose={contentCreationDrawerStore.onClose}
      size="lg"
      initialFocusRef={firstDrawerField}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader
          color="brand.600"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Icon as={FaRegSquarePlus} />
          <Heading fontSize="2xl">Create new content</Heading>
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
                      focusBorderColor="brand.600"
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
                <FormLabel as="legend" fontSize="lg" color="brand.600">
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
                          "Title must have at least one non-whitespace character.",
                      },
                    })}
                    type="text"
                    focusBorderColor="brand.600"
                  />
                  <FormErrorMessage>
                    {errors.originalTitle?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.englishTitle?.message}>
                  <FormLabel>English Title</FormLabel>
                  <Input
                    {...register("englishTitle")}
                    type="text"
                    focusBorderColor="brand.600"
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
                    focusBorderColor="brand.600"
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
            colorScheme="brand"
            isDisabled={isSaving}
            variant="outline"
            mr={3}
            onClick={() => {
              if (isDirty) {
                cancelAlertDialogDisclosure.onOpen();
              } else {
                contentCreationDrawerStore.onClose();
                reset();
              }
            }}
          >
            Cancel
          </Button>
          <Button
            isLoading={isSaving}
            loadingText="Creating"
            colorScheme="brand"
            type="submit"
            form="create-content-form"
          >
            Create
          </Button>
        </DrawerFooter>
      </DrawerContent>

      <CancelCreationAlertDialog
        cancelAlertDialogDisclosure={cancelAlertDialogDisclosure}
        handleConfirmedCancel={handleConfirmedCancel}
        entity="CONTENT"
      />
    </Drawer>
  );
}
