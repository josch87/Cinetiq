import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaFileExport, FaShareNodes, FaTrash } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { MouseEvent } from "react";
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

  function handleDeleteContent(event: MouseEvent<HTMLButtonElement>) {
    console.log(event);
    console.log(content.id);
    axios.delete(`/api/content/${content.id}`).then(() => {
      navigate("/content");
    });
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FiChevronDown />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem icon={<FaShareNodes />}>Share</MenuItem>
        <MenuItem icon={<FaFileExport />}>Export</MenuItem>
        {content.status === "ACTIVE" && (
          <MenuItem
            icon={<FaTrash />}
            onClick={handleDeleteContent}
            color="red"
          >
            Delete
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
