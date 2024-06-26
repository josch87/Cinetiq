import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { ContentType } from "../../model/contentModel.ts";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

type DeleteContentAlertDialogProps = {
  content: ContentType;
  isOpen: boolean;
  onClose: () => void;
};

export default function DeleteAlertDialog({
  content,
  isOpen,
  onClose,
}: Readonly<DeleteContentAlertDialogProps>) {
  const navigate = useNavigate();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  function handleDeleteContent() {
    axios
      .delete(`/api/content/${content.id}`)
      .then(() => {
        navigate("/content");
        toast({
          title: "Success",
          description: "Deleted content",
          status: "success",
          isClosable: true,
        });
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
        toast({
          title: "Error",
          description: "Deleting was not possible",
          status: "error",
          isClosable: true,
        });
      });
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Content
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteContent} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
