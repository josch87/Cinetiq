import { Flex, Image, Text } from "@chakra-ui/react";

function getRandomDog() {
  const dogs: string[] = [
    "no-data-dog-001.svg",
    "no-data-dog-002.svg",
    "no-data-dog-003.svg",
  ];

  const randomDog = dogs[Math.floor(Math.random() * dogs.length)];
  return "/illustrations/" + randomDog;
}
type NoDataProps = {
  text?: string;
};

export default function NoData({ text = "No data found" }: NoDataProps) {
  return (
    <Flex flexDirection="column" alignItems="center" gap={4}>
      <Image src={getRandomDog()} boxSize="sm" />
      <Text as="em" fontSize="lg">
        {text}
      </Text>
    </Flex>
  );
}
