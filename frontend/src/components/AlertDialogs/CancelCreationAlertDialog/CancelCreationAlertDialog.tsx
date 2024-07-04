import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";

export type CancelAlertDialogDisclosureType = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

type CancelContentCreationAlertDialogProps = {
  cancelAlertDialogDisclosure: CancelAlertDialogDisclosureType;
  handleConfirmedCancel: () => void;
  entity: "CONTENT" | "PERSON";
};

export default function CancelCreationAlertDialog({
  cancelAlertDialogDisclosure,
  handleConfirmedCancel,
  entity,
}: Readonly<CancelContentCreationAlertDialogProps>) {
  const firstField = useRef<HTMLButtonElement>(null);

  let heading;
  let description;

  switch (entity) {
    case "CONTENT":
      heading = "Cancel Content Creation";
      description =
        "Are you sure you want to cancel creating new content? All entered data will be lost.";
      break;
    case "PERSON":
      heading = "Cancel Person Creation";
      description =
        "Are you sure you want to cancel creating a new person? All entered data will be lost.";
      break;
  }

  return (
    <AlertDialog
      leastDestructiveRef={firstField}
      isOpen={cancelAlertDialogDisclosure.isOpen}
      onClose={cancelAlertDialogDisclosure.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {heading}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Stack spacing={4}>
              <Text>{description}</Text>
              <Text as="em" fontSize="xs">
                Hint: If you wish to continue at a later time consider only
                closing the drawer instead.
              </Text>
            </Stack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={firstField}
              onClick={cancelAlertDialogDisclosure.onClose}
            >
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleConfirmedCancel}>
              Yes, Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
