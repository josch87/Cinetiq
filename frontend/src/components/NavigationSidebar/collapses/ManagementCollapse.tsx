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
import { FaBriefcase } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const ManagementCollapse = () => {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const data = [
    {
      id: 1,
      title: "Staff",
      onClick: () => {
        navigate("/staff");
      },
    },
  ];

  return (
    <Box>
      <Button
        variant="tertiary"
        onClick={onToggle}
        justifyContent="space-between"
        width="full"
      >
        <HStack spacing="3">
          <Icon as={FaBriefcase} />
          <Text as="span">Management</Text>
        </HStack>
        <PopoverIcon isOpen={isOpen} />
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Stack spacing="1" alignItems="stretch" ps="8" py="1">
          {data.map((item) => (
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
};

export const PopoverIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? "rotate(-180deg)" : undefined,
    transition: "transform 0.2s",
    transformOrigin: "center",
  };
  return <Icon aria-hidden as={FiChevronDown} __css={iconStyles} />;
};
