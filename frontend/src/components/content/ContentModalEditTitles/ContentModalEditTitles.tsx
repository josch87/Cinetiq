import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  ContentType,
  NewContentType,
  UpdateContentTitlesType,
} from "../../../model/contentModel.ts";
import { useRef } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponseType } from "../../../model/apiModel.ts";
import { FaPen } from "react-icons/fa6";

type ContentModalEditTitlesProps = {
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
  };
  content: ContentType;
};

export default function ContentModalEditTitles({
  disclosure,
  content,
}: Readonly<ContentModalEditTitlesProps>) {
  const initialRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<NewContentType>({
    mode: "onChange",
    defaultValues: {
      englishTitle: content.englishTitle,
      germanTitle: content.germanTitle,
      originalTitle: content.originalTitle,
    },
  });

  function handleClose() {
    reset();
    disclosure.onClose();
  }

  function handleFormSubmit(data: UpdateContentTitlesType) {
    axios
      .patch(`/api/content/${content.id}`, data)
      .then((response: AxiosResponse<ApiResponseType<ContentType>>) => {
        disclosure.onClose();
        reset();
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
      });
  }

  return (
    <Modal
      //isCentered
      onClose={handleClose}
      isOpen={disclosure.isOpen}
      motionPreset="slideInBottom"
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="teal" display="flex" alignItems="center" gap={2}>
          <Icon as={FaPen} />
          <Heading fontSize="2xl">Edit titles</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            noValidate
            id="update-content-title-form"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <Stack pb={4} spacing={4}>
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
                  {...register("englishTitle", {
                    validate: {
                      notOnlySpaces: (value) =>
                        value.trim() !== "" ||
                        value === "" ||
                        "Title must not be only whitespace.",
                    },
                  })}
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
                    validate: {
                      notOnlySpaces: (value) =>
                        value.trim() !== "" ||
                        value === "" ||
                        "Title must not be only whitespace.",
                    },
                  })}
                  type="text"
                  focusBorderColor="teal.600"
                />
                <FormErrorMessage>
                  {errors.germanTitle?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            ref={initialRef}
            variant="outline"
            mr={3}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            type="submit"
            form="update-content-title-form"
            isDisabled={!isDirty || Object.keys(errors).length > 0}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
