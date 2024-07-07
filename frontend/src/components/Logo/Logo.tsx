import { HStack, Image } from "@chakra-ui/react";

export default function Logo() {
  return (
    <HStack>
      <Image
        src="/logo/cinetiq-logo.svg"
        alt="Logo of Cinetiq"
        boxSize="40px"
      />
      <Image
        src="/logo/cinetiq-lettering.svg"
        alt="Lettering of Cinetiq"
        width="150px"
      />
    </HStack>
  );
}
