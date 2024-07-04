import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { PersonType } from "../../../model/personModel.ts";
import { FaPerson } from "react-icons/fa6";

type PersonDetailsHeaderProps = {
  person: PersonType;
};

export default function PersonDetailsHeader({
  person,
}: Readonly<PersonDetailsHeaderProps>) {
  return (
    <Box as="section" pb={{ base: "12", md: "4" }}>
      <Box
        bg="bg.surface"
        bgColor="white"
        px={{ base: "4", md: "6" }}
        py="5"
        boxShadow="sm"
        borderRadius="lg"
      >
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing="4"
          justify="space-between"
        >
          <Stack spacing="1">
            <Stack flexDirection="row" alignItems="center">
              <FaPerson />
              <Heading fontSize="xl" fontWeight="bold">
                {`${person.firstName} ${person.lastName}`}
              </Heading>
            </Stack>
            <Text textStyle="sm" color="fg.muted">
              {`Created on ${person.createdAt.toDateString()} by ${person.createdBy.githubUserProfileSynced.name ? person.createdBy.githubUserProfileSynced.name : person.createdBy.githubUserProfileSynced.login}`}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
