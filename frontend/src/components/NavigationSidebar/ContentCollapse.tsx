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
import { FaFilm } from "react-icons/fa6";

export const ContentCollapse = () => {
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
          <Icon as={FaFilm} />
          <Text as="span">Content</Text>
        </HStack>
        <PopoverIcon isOpen={isOpen} />
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Stack spacing="1" alignItems="stretch" ps="8" py="1">
          {["Content Filter", "Add content"].map((item) => (
            <Button key={item} variant="tertiary" justifyContent="start">
              {item}
            </Button>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
};

export const PopoverIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? "rotate(-180deg)" : undefined,
    transition: "transform 0.2s",
    transformOrigin: "center",
  };
  return <Icon aria-hidden as={FiChevronDown} __css={iconStyles} />;
};
