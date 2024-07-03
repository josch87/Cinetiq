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
  Heading,
  Icon,
  Input,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import CancelContentCreationAlertDialog, {
  CancelAlertDialogDisclosureType,
} from "../../AlertDialogs/CancelContentCreationAlertDialog/CancelContentCreationAlertDialog.tsx";
import { ApiResponseType } from "../../../model/apiModel.ts";
import { FaPerson } from "react-icons/fa6";
import { NewPersonType, PersonType } from "../../../model/personModel.ts";
import { usePersonCreationDrawerStore } from "../../../store/personStore.ts";

export default function PersonCreationDrawer() {
  const toast = useToast();
  const navigate = useNavigate();
  const firstDrawerField = useRef<HTMLInputElement>(null);
  const personCreationDrawerStore = usePersonCreationDrawerStore();
  const cancelAlertDialogDisclosure: CancelAlertDialogDisclosureType =
    useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm<NewPersonType>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  function handleFormSubmit(data: NewPersonType) {
    axios
      .post("/api/people", data)
      .then((response: AxiosResponse<ApiResponseType<PersonType>>) => {
        toast({
          title: "Success",
          description: "Created person",
          status: "success",
          isClosable: true,
        });
        navigate(`/people/${response.data.data.id}`);
        personCreationDrawerStore.onClose();
        reset();
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
      });
  }

  function handleConfirmedCancel() {
    cancelAlertDialogDisclosure.onClose();
    reset();
    personCreationDrawerStore.onClose();
  }

  return (
    <Drawer
      isOpen={personCreationDrawerStore.isOpen}
      placement="right"
      onClose={personCreationDrawerStore.onClose}
      size="lg"
      initialFocusRef={firstDrawerField}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader color="teal" display="flex" alignItems="center" gap={2}>
          <Icon as={FaPerson} />
          <Heading fontSize="2xl" color="teal.600">
            Create new person
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
              <Stack
                as="fieldset"
                px={4}
                pb={4}
                borderWidth={2}
                borderRadius="md"
                spacing={4}
              >
                <FormLabel as="legend" fontSize="lg" color="teal.600">
                  Names
                </FormLabel>

                <FormControl isInvalid={!!errors.firstName?.message} isRequired>
                  <FormLabel>First name</FormLabel>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{
                      required: "First name is required.",
                      validate: {
                        notOnlySpaces: (value) =>
                          value.trim() !== "" ||
                          "First name must have at least one non-whitespace character.",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        ref={firstDrawerField}
                        type="text"
                        focusBorderColor="teal.600"
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.firstName?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.lastName?.message} isRequired>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    {...register("lastName", {
                      required: "Last name is required.",
                      validate: {
                        notOnlySpaces: (value) =>
                          value.trim() !== "" ||
                          "Last name must have at least one non-whitespace character.",
                      },
                    })}
                    type="text"
                    focusBorderColor="teal.600"
                  />
                  <FormErrorMessage>
                    {errors.lastName?.message}
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
                cancelAlertDialogDisclosure.onOpen();
              } else {
                personCreationDrawerStore.onClose();
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

      <CancelContentCreationAlertDialog
        cancelAlertDialogDisclosure={cancelAlertDialogDisclosure}
        handleConfirmedCancel={handleConfirmedCancel}
      />
    </Drawer>
  );
}
