import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import { AppUserType } from "../../model/userModel.ts";
import { Skeleton, VStack } from "@chakra-ui/react";
import NoData from "../../components/NoData/NoData.tsx";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService.ts";
import { InfoType } from "../../model/apiModel.ts";
import { AxiosError } from "axios";
import StaffTable from "../../components/staff/StaffTable/StaffTable.tsx";
import ResultHeader from "../../components/ResultHeader/ResultHeader.tsx";
import { GithubUserAuthType } from "../../model/githubModel.ts";
import { appUsersSkeletonData } from "../../model/userTestData.ts";

type StaffPageProps = {
  user: GithubUserAuthType | null | undefined;
};

export default function StaffPage({ user }: Readonly<StaffPageProps>) {
  const [info, setInfo] = useState<InfoType | undefined | null>(undefined);
  const [appUsers, setAppUsers] = useState<AppUserType[] | undefined | null>(
    undefined
  );

  useEffect(() => {
    getUsers()
      .then((response) => {
        if (response) {
          setInfo(response.info);
          setAppUsers(response.data);
        }
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
        setInfo(null);
        setAppUsers(null);
      });
  }, []);

  if (info === null || appUsers === null) {
    return <>Some error occurred</>;
  }

  if (info === undefined || appUsers === undefined) {
    return (
      <DefaultPageTemplate
        pageTitle="Staff"
        pageSubtitle="Display all staff accounts"
        user={user}
      >
        <ResultHeader info={info} />

        <Skeleton>
          <StaffTable appUsers={appUsersSkeletonData} />
        </Skeleton>
      </DefaultPageTemplate>
    );
  }

  return (
    <DefaultPageTemplate
      pageTitle="Staff"
      pageSubtitle="Display all staff accounts"
      user={user}
    >
      <ResultHeader info={info} />

      {info.count === 0 ? (
        <VStack gap={8}>
          <NoData />
        </VStack>
      ) : (
        <StaffTable appUsers={appUsers} />
      )}
    </DefaultPageTemplate>
  );
}
