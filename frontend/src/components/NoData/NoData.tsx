import { Flex, Image, Text } from "@chakra-ui/react";

type ImageType = "RANDOM_DATA_DOG" | "SNIFFING_DOG";

type NoDataProps = {
  text?: string;
  image?: ImageType;
};

function getRandomDog() {
  const dogs: string[] = [
    "no-data-dog-001.svg",
    "no-data-dog-002.svg",
    "no-data-dog-003.svg",
  ];

  const randomDog = dogs[Math.floor(Math.random() * dogs.length)];
  return "/illustrations/" + randomDog;
}

function getImage(type: ImageType): string {
  let image;

  switch (type) {
    case "RANDOM_DATA_DOG":
      image = getRandomDog();
      break;
    case "SNIFFING_DOG":
      image = "/illustrations/sniffing-dog.svg";
      break;
    default:
      image = "";
  }

  return image;
}

export default function NoData({
  text = "No data found",
  image = "RANDOM_DATA_DOG",
}: Readonly<NoDataProps>) {
  return (
    <Flex flexDirection="column" alignItems="center" gap={4}>
      <Image src={getImage(image)} boxSize="sm" draggable={false} />
      <Text as="em" fontSize="lg">
        {text}
      </Text>
    </Flex>
  );
}
