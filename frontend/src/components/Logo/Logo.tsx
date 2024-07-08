import { Box, HStack, Image, InteractivityProps } from "@chakra-ui/react";

type LogoProps = {
  onClick?: () => void;
  cursor?: InteractivityProps["cursor"];
};

export default function Logo({ onClick, cursor }: Readonly<LogoProps>) {
  return (
    <HStack onClick={onClick} cursor={cursor}>
      <Image
        src="/logo/cinetiq-logo.svg"
        alt="Logo of Cinetiq"
        boxSize={"40px"}
        draggable={false}
      />

      <Box width="100%">
        <Image
          src="/logo/cinetiq-lettering.svg"
          alt="Lettering of Cinetiq"
          draggable={false}
        />
      </Box>
    </HStack>
  );
}
