import { GithubUserAuthType } from "../../model/githubModel.ts";
import { useParams } from "react-router-dom";
import { usePersonStore } from "../../store/personStore.ts";
import { useEffect } from "react";
import { getPersonById } from "../../services/personService.ts";
import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";

type PersonDetailsPageProps = {
  user: GithubUserAuthType | null | undefined;
};

export default function PersonDetailsPage({
  user,
}: Readonly<PersonDetailsPageProps>) {
  const params = useParams();
  const id: string | undefined = params.id;

  const person = usePersonStore((state) => state.person);
  const setPerson = usePersonStore((state) => state.setPerson);

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

  if (person) {
    return (
      <DefaultPageTemplate
        pageTitle={"Person Details"}
        pageSubtitle="Display details of the person"
        user={user}
        warning={person.status != "ACTIVE"}
      >
        Test
      </DefaultPageTemplate>
    );
  }
}
