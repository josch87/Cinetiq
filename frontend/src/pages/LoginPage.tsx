import { Box, Button, Flex, Image, VStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

type LoginPageProps = {
  user: string | null | undefined;
};

export default function LoginPage({ user }: LoginPageProps) {
  function login() {
    const host =
      window.location.host === "localhost:5173"
        ? "http://localhost:8080"
        : window.location.origin;

    window.open(host + "/oauth2/authorization/github", "_self");
  }

  if (user === undefined) {
    return <div>Loading</div>;
  }

  return user ? (
    <Outlet />
  ) : (
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
        justifyContent="center"
        alignItems="center"
      >
        <VStack spacing={400}>
          <Image
            src="logo/login-logo.jpeg"
            alt="Logo of Cinetiq"
            boxSize="200px"
          />
          <Button
            leftIcon={<FaGithub />}
            colorScheme="teal"
            variant="outline"
            onClick={login}
          >
            Login with GitHub
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
}
