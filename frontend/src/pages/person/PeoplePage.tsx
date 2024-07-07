import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import ResultHeader from "../../components/ResultHeader/ResultHeader.tsx";
import { Button, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ApiResponseType } from "../../model/apiModel.ts";
import { PersonType } from "../../model/personModel.ts";
import { getPeople } from "../../services/personService.ts";
import NoData from "../../components/NoData/NoData.tsx";
import PersonTable from "../../components/person/PersonTable/PersonTable.tsx";
import { usePersonCreationDrawerStore } from "../../store/personStore.ts";

export default function PeoplePage() {
  const [peopleResponse, setPeopleResponse] = useState<
    ApiResponseType<PersonType[]> | undefined | null
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onPersonCreationDrawerStore = usePersonCreationDrawerStore(
    (state) => state.onOpen
  );

  useEffect(() => {
    getPeople()
      .then((response) => {
        if (response) {
          setPeopleResponse(response);
          setIsLoading(false);
        }
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
        setPeopleResponse(null);
      });
  }, []);

  if (peopleResponse === null) {
    return <>Some error occurred</>;
  }

  return (
    <DefaultPageTemplate pageTitle="People" pageSubtitle="Display all people">
      {peopleResponse?.info.count === 0 ? (
        <VStack gap={8}>
          <NoData />
          <Button colorScheme="brand" onClick={onPersonCreationDrawerStore}>
            Create a person
          </Button>
        </VStack>
      ) : (
        <>
          <ResultHeader info={peopleResponse?.info} isLoading={isLoading} />
          <PersonTable
            people={peopleResponse?.data ?? []}
            isLoading={isLoading}
          />
        </>
      )}
    </DefaultPageTemplate>
  );
}
