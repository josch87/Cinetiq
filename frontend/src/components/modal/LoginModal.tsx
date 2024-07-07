import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useLoginModalStore } from "../../store/authStore.ts";
import { FaGithub } from "react-icons/fa6";
import { login } from "../../services/authService.ts";

export default function LoginModal() {
  const { isOpen, onClose } = useLoginModalStore();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          Your session has expired due to inactivity. For your security, we have
          logged you out. Please log in again to continue.
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={login} leftIcon={<FaGithub />}>
            Login with GitHub
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
