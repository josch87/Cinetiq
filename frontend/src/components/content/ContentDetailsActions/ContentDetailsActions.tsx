import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { FaFileExport, FaShareNodes, FaTrash } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import React, { MouseEvent } from "react";
import { contentType } from "../../../model/contentModel.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type ContentDetailsActionsProps = {
  content: contentType;
};

export default function ContentDetailsActions({
  content,
}: Readonly<ContentDetailsActionsProps>) {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  function handleDeleteContent(event: MouseEvent<HTMLButtonElement>) {
    axios.delete(`/api/content/${content.id}`).then(() => {
      navigate("/content");
    });
  }

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<FiChevronDown />}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FaShareNodes />}>Share</MenuItem>
          <MenuItem icon={<FaFileExport />}>Export</MenuItem>
          {content.status === "ACTIVE" && (
            <MenuItem icon={<FaTrash />} onClick={onOpen} color="red">
              Delete
            </MenuItem>
          )}
        </MenuList>
      </Menu>

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
    </>
  );
}
