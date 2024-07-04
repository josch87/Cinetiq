import { GithubUserAuthType } from "../../model/githubModel.ts";
import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import ResultHeader from "../../components/ResultHeader/ResultHeader.tsx";
import { Skeleton, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { InfoType } from "../../model/apiModel.ts";
import { PersonType } from "../../model/personModel.ts";
import { getPeople } from "../../services/personService.ts";
import NoData from "../../components/NoData/NoData.tsx";
import PersonTable from "../../components/person/PersonTable/PersonTable.tsx";
import { peopleSkeletonData } from "../../model/personTestData.ts";

type PeoplePageProps = {
  user: GithubUserAuthType | null | undefined;
};

export default function PeoplePage({ user }: Readonly<PeoplePageProps>) {
  const [info, setInfo] = useState<InfoType | undefined | null>(undefined);
  const [people, setPeople] = useState<PersonType[] | undefined | null>(
    undefined
  );

  useEffect(() => {
    getPeople()
      .then((response) => {
        if (response) {
          setInfo(response.info);
          setPeople(response.data);
        }
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
        setInfo(null);
        setPeople(null);
      });
  }, []);

  if (info === null || people === null) {
    return <>Some error occurred</>;
  }

  if (info === undefined || people === undefined) {
    return (
      <DefaultPageTemplate
        pageTitle="People"
        pageSubtitle="Display all people"
        user={user}
      >
        <ResultHeader info={info} />

        <Skeleton>
          <PersonTable people={peopleSkeletonData} />
        </Skeleton>
      </DefaultPageTemplate>
    );
  }

  return (
    <DefaultPageTemplate
      pageTitle="People"
      pageSubtitle="Display all people"
      user={user}
    >
      <ResultHeader info={info} />

      {info.count === 0 ? (
        <VStack gap={8}>
          <NoData />
        </VStack>
      ) : (
        <PersonTable people={people} />
      )}
    </DefaultPageTemplate>
  );
}
