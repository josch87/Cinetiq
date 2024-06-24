import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { contentType } from "../../model/contentModel.ts";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

type DeleteContentAlertDialogProps = {
  content: contentType;
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

  function handleDeleteContent() {
    axios
      .delete(`/api/content/${content.id}`)
      .then(() => {
        navigate("/content");
      })
      .catch((error) => console.error(error.message));
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
