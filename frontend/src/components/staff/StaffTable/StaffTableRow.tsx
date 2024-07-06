import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  HStack,
  Link,
  Skeleton,
  SkeletonCircle,
  Td,
  Text,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { AppUserType } from "../../../model/userModel.ts";

type StaffTableRowProps = {
  appUser: AppUserType;
  isLoading: boolean;
};

export default function StaffTableRow({
  appUser,
  isLoading,
}: Readonly<StaffTableRowProps>) {
  return (
    <Tr>
      <Td>
        <HStack spacing="3">
          <Skeleton height="16px" width="16px" isLoaded={!isLoading}>
            <Checkbox />
          </Skeleton>
          <SkeletonCircle size="10" isLoaded={!isLoading}>
            <Avatar
              name={appUser.githubUserProfileSynced.name}
              src={appUser.githubUserProfileSynced.avatar_url}
              boxSize="10"
            />
          </SkeletonCircle>
          <Box>
            <Skeleton isLoaded={!isLoading}>
              <Text fontWeight="medium">
                {appUser.githubUserProfileSynced.name}
              </Text>
            </Skeleton>
            {appUser.githubUserProfileActive ? (
              <Skeleton isLoaded={!isLoading}>
                <Tooltip label="GitHub Profile">
                  <Link
                    href={appUser.githubUserProfileSynced.html_url}
                    isExternal
                  >
                    {appUser.githubUserProfileSynced.login}
                  </Link>
                </Tooltip>
              </Skeleton>
            ) : (
              <Skeleton isLoaded={!isLoading}>
                {appUser.githubUserProfileSynced.login}
              </Skeleton>
            )}
          </Box>
        </HStack>
      </Td>
      <Td>
        <Skeleton isLoaded={!isLoading}>
          <Badge
            size="sm"
            colorScheme={appUser.status === "ACTIVE" ? "green" : "red"}
          >
            {appUser.status}
          </Badge>
        </Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={!isLoading}>
          <Text color="fg.muted">{appUser.githubUserProfileSynced.email}</Text>
        </Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={!isLoading}>
          <Text color="fg.muted">{appUser.githubUserProfileSynced.bio}</Text>
        </Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={!isLoading}>
          <Tooltip
            label={`${appUser.createdAt.toDateString()}, ${appUser.createdAt.toLocaleTimeString()}`}
          >
            <Text color="fg.muted">
              {appUser.createdAt.toLocaleDateString()}
            </Text>
          </Tooltip>
        </Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={!isLoading}>
          <Tooltip
            label={`${appUser.githubUserProfileSyncedAt.toDateString()}, ${appUser.githubUserProfileSyncedAt.toLocaleTimeString()}`}
          >
            <Text color="fg.muted">
              {appUser.githubUserProfileSyncedAt.toLocaleDateString()}
            </Text>
          </Tooltip>
        </Skeleton>
      </Td>
    </Tr>
  );
}
