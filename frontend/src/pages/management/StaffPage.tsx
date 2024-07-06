import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import { AppUserType } from "../../model/userModel.ts";
import { VStack } from "@chakra-ui/react";
import NoData from "../../components/NoData/NoData.tsx";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService.ts";
import { ApiResponseType } from "../../model/apiModel.ts";
import { AxiosError } from "axios";
import StaffTable from "../../components/staff/StaffTable/StaffTable.tsx";
import ResultHeader from "../../components/ResultHeader/ResultHeader.tsx";

export default function StaffPage() {
  const [appUsersResponse, setAppUsersResponse] = useState<
    ApiResponseType<AppUserType[]> | undefined | null
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUsers()
      .then((response) => {
        if (response) {
          setAppUsersResponse(response);
          setIsLoading(false);
        }
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
        setAppUsersResponse(null);
      });
  }, []);

  if (appUsersResponse === null) {
    return <>Some error occurred</>;
  }

  return (
    <DefaultPageTemplate
      pageTitle="Staff"
      pageSubtitle="Display all staff accounts"
    >
      {appUsersResponse?.info.count === 0 ? (
        <VStack gap={8}>
          <NoData />
        </VStack>
      ) : (
        <>
          <ResultHeader info={appUsersResponse?.info} isLoading={isLoading} />
          <StaffTable
            appUsers={appUsersResponse?.data ?? []}
            isLoading={isLoading}
          />
        </>
      )}
    </DefaultPageTemplate>
  );
}
