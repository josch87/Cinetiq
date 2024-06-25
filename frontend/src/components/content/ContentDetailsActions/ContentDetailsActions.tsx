import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { FaFileExport, FaShareNodes, FaTrash } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { contentType } from "../../../model/contentModel.ts";
import DeleteAlertDialog from "../../AlertDialogs/DeleteAlertDialog.tsx";

type ContentDetailsActionsProps = {
  content: contentType;
};

export default function ContentDetailsActions({
  content,
}: Readonly<ContentDetailsActionsProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<FiChevronDown />}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FaShareNodes />} isDisabled>
            Share
          </MenuItem>
          <MenuItem icon={<FaFileExport />} isDisabled>
            Export
          </MenuItem>
          {content.status === "ACTIVE" && (
            <MenuItem icon={<FaTrash />} onClick={onOpen} color="red">
              Delete
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <DeleteAlertDialog content={content} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
