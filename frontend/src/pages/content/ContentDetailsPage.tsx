import { useParams } from "react-router-dom";
import { getContentById } from "../../services/contentService.ts";
import { useEffect } from "react";
import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import ContentDetailsHeader from "../../components/content/ContentDetailsHeader/ContentDetailsHeader.tsx";
import ContentDetailsBody from "../../components/content/ContentDetailsBody/ContentDetailsBody.tsx";
import { useContentStore } from "../../store/contentStore.ts";
import { GithubUserAuthType } from "../../model/githubModel.ts";

type ContentDetailsPageProps = {
  user: GithubUserAuthType | null | undefined;
};

export default function ContentDetailsPage({
  user,
}: Readonly<ContentDetailsPageProps>) {
  const params = useParams();
  const id: string | undefined = params.id;

  const content = useContentStore((state) => state.content);
  const setContent = useContentStore((state) => state.setContent);

  useEffect(() => {
    if (id) {
      getContentById(id)
        .then((response) => {
          if (response) {
            setContent(response.data);
          } else {
            setContent(null);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setContent(null);
        });
    }
  }, [id]); //eslint-disable-line react-hooks/exhaustive-deps

  if (content) {
    return (
      <DefaultPageTemplate
        pageTitle={"Content Details"}
        pageSubtitle="Display details of the content"
        user={user}
        warning={content.status != "ACTIVE"}
      >
        <ContentDetailsHeader content={content} />
        <ContentDetailsBody content={content} />
      </DefaultPageTemplate>
    );
  }
}
