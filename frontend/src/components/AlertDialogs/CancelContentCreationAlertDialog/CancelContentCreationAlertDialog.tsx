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
};

export default function CancelContentCreationAlertDialog({
  cancelAlertDialogDisclosure,
  handleConfirmedCancel,
}: Readonly<CancelContentCreationAlertDialogProps>) {
  const firstField = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      leastDestructiveRef={firstField}
      isOpen={cancelAlertDialogDisclosure.isOpen}
      onClose={cancelAlertDialogDisclosure.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Cancel Content Creation
          </AlertDialogHeader>

          <AlertDialogBody>
            <Stack spacing={4}>
              <Text>
                Are you sure you want to cancel creating new content? All
                entered data will be lost.
              </Text>
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
