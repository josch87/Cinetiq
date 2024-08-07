import { useParams } from "react-router-dom";
import { usePersonStore } from "../../store/personStore.ts";
import { useEffect, useState } from "react";
import { getPersonById } from "../../services/personService.ts";
import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import PersonDetailsHeader from "../../components/person/PersonDetailsHeader/PersonDetailsHeader.tsx";
import { VStack } from "@chakra-ui/react";
import NoData from "../../components/NoData/NoData.tsx";

export default function PersonDetailsPage() {
  const params = useParams();
  const id: string | undefined = params.id;

  const person = usePersonStore((state) => state.person);
  const setPerson = usePersonStore((state) => state.setPerson);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (person?.id !== id) {
      setIsLoading(true);
    } else if (person?.id === id) {
      setIsLoading(false);
    }
  }, [person, id]);

  useEffect(() => {
    if (id) {
      getPersonById(id)
        .then((response) => {
          if (response) {
            setPerson(response.data);
          } else {
            setPerson(null);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setPerson(null);
        });
    }
  }, [id]); //eslint-disable-line react-hooks/exhaustive-deps

  if (person === null) {
    return (
      <DefaultPageTemplate
        pageTitle="Person Details"
        pageSubtitle="Display details of the person"
        warning={false}
      >
        <VStack gap={8}>
          <NoData text={`Could not find person with ID '${id}'`} />
        </VStack>
      </DefaultPageTemplate>
    );
  }

  return (
    <DefaultPageTemplate
      pageTitle="Person Details"
      pageSubtitle="Display details of the person"
      warning={person ? person.status != "ACTIVE" : false}
    >
      <PersonDetailsHeader person={person} isLoading={isLoading} />
    </DefaultPageTemplate>
  );
}
