import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaCodeMerge,
  FaFileExport,
  FaShareNodes,
  FaTrash,
} from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { ContentType } from "../../../model/contentModel.ts";
import DeleteAlertDialog from "../../AlertDialogs/DeleteAlertDialog.tsx";

type ContentDetailsActionsProps = {
  content: ContentType;
  isLoading: boolean;
};

export default function ContentDetailsActions({
  content,
  isLoading,
}: Readonly<ContentDetailsActionsProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isLoading ? (
        <Button rightIcon={<FiChevronDown />} isDisabled>
          Actions
        </Button>
      ) : (
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
            <MenuDivider />
            <MenuItem icon={<FaCodeMerge />} isDisabled>
              Merge
            </MenuItem>
            {content.status === "ACTIVE" && (
              <MenuItem icon={<FaTrash />} onClick={onOpen} color="red">
                Delete
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      )}
      <DeleteAlertDialog content={content} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
