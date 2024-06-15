import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { isLoggedIn, login } from "../../services/userService.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <Flex height="100vh">
      <Box width="100%" bg="gray.200">
        <Image
          src="login/image1.jpeg"
          alt="A picture illustrating film festivals"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      <Flex
        width="500px"
        bg="gray.50"
        direction="column"
        justifyContent="space-around"
        alignItems="center"
      >
        <Image
          src="logo/login-logo.jpeg"
          alt="Logo of Cinetiq"
          boxSize="150px"
        />
        <Button
          leftIcon={<FaGithub />}
          colorScheme="teal"
          variant="outline"
          onClick={login}
        >
          Login with GitHub
        </Button>
      </Flex>
    </Flex>
  );
}
