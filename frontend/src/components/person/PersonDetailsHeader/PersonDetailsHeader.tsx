import { Box, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { PersonType } from "../../../model/personModel.ts";
import { FaPerson } from "react-icons/fa6";

type PersonDetailsHeaderProps = {
  person?: PersonType;
  isLoading: boolean;
};

export default function PersonDetailsHeader({
  person,
  isLoading,
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
              <Skeleton isLoaded={!isLoading}>
                <Heading fontSize="xl" fontWeight="bold">
                  {person
                    ? `${person.firstName} ${person.lastName}`
                    : "Chuck Norris"}
                </Heading>
              </Skeleton>
            </Stack>
            <Skeleton isLoaded={!isLoading}>
              <Text textStyle="sm" color="fg.muted">
                {person
                  ? `Created on ${person.createdAt.toDateString()} by ${person.createdBy.githubUserProfileSynced.name ? person.createdBy.githubUserProfileSynced.name : person.createdBy.githubUserProfileSynced.login}`
                  : "Created on Thu Jul 04 2024 by Chuck Norris"}
              </Text>
            </Skeleton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
