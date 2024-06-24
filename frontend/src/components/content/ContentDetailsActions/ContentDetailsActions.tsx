import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaFileExport, FaShareNodes, FaTrash } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";

export default function ContentDetailsActions() {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FiChevronDown />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem icon={<FaShareNodes />}>Share</MenuItem>
        <MenuItem icon={<FaFileExport />}>Export</MenuItem>
        <MenuItem icon={<FaTrash />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
