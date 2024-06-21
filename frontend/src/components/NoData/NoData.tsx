import { Flex, Image, Text } from "@chakra-ui/react";

function getRandomDog() {
  const dogs: string[] = [
    "no-data-dog-001.svg",
    "no-data-dog-002.svg",
    "no-data-dog-003.svg",
  ];

  const randomDog = dogs[Math.floor(Math.random() * dogs.length)];
  return "illustrations/" + randomDog;
}

export default function NoData() {
  return (
    <Flex flexDirection="column" alignItems="center" gap={4}>
      <Image src={getRandomDog()} boxSize="sm" />
      <Text as="em" fontSize="lg">
        No data found
      </Text>
    </Flex>
  );
}
