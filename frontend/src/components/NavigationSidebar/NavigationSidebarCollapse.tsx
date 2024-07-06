import {
  Box,
  Button,
  Collapse,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { IconType } from "react-icons";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

type MenuItem = {
  id: number;
  title: string;
  onClick: () => void;
  path?: string;
};

type CollapseProps = {
  title: string;
  icon: IconType;
  menuItems: MenuItem[];
};

export default function NavigationSidebarCollapse({
  title,
  icon,
  menuItems,
}: Readonly<CollapseProps>) {
  const location = useLocation();
  const { isOpen, onToggle, onOpen } = useDisclosure();

  useEffect(() => {
    if (
      menuItems.some(
        (item) => item.path && location.pathname.startsWith(item.path)
      )
    ) {
      onOpen();
    }
  }, [location.pathname, menuItems, onOpen]);

  return (
    <Box>
      <Button
        variant="tertiary"
        onClick={onToggle}
        justifyContent="space-between"
        width="full"
      >
        <HStack spacing="3">
          <Icon as={icon} />
          <Text as="span">{title}</Text>
        </HStack>
        <PopoverIcon isOpen={isOpen} />
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Stack spacing="1" alignItems="stretch" ps="8" py="1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              color={
                item.path && location.pathname.startsWith(item.path)
                  ? "teal.500"
                  : "inherit"
              }
              variant="tertiary"
              justifyContent="start"
              onClick={item.onClick}
            >
              {item.title}
            </Button>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
}

export const PopoverIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? "rotate(-180deg)" : undefined,
    transition: "transform 0.2s",
    transformOrigin: "center",
  };
  return <Icon aria-hidden as={FiChevronDown} __css={iconStyles} />;
};
