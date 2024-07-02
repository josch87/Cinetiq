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

type CollapseProps = {
  title: string;
  icon: IconType;
  menuItems: {
    id: number;
    title: string;
    onClick: () => void;
  }[];
};

export default function NavigationSidebarCollapse({
  title,
  icon,
  menuItems,
}: Readonly<CollapseProps>) {
  const { isOpen, onToggle } = useDisclosure();

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
