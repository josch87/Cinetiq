import { useParams } from "react-router-dom";
import { getContentById } from "../../services/contentService.ts";
import { useEffect, useState } from "react";
import { contentType } from "../../model/contentModel.ts";
import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../../model/userModel.ts";
import ContentDetailsHeader from "../../components/content/ContentDetailsHeader/ContentDetailsHeader.tsx";
import ContentDetailsBody from "../../components/content/ContentDetailsBody/ContentDetailsBody.tsx";

type ContentDetailsPageProps = {
  user: githubUserType | null | undefined;
};

export default function ContentDetailsPage({
  user,
}: Readonly<ContentDetailsPageProps>) {
  const params = useParams();
  const id: string | undefined = params.id;

  const [content, setContent] = useState<contentType | undefined | null>(
    undefined
  );

  useEffect(() => {
    if (id) {
      getContentById(id)
        .then((response) => {
          if (response) {
            setContent(response.content);
          } else {
            setContent(null);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setContent(null);
        });
    }
  }, [id]);

  if (content) {
    return (
      <DefaultPageTemplate
        pageTitle={"Content Details"}
        pageSubtitle="Display details of the content"
        user={user}
      >
        <ContentDetailsHeader content={content} />
        <ContentDetailsBody content={content} />
      </DefaultPageTemplate>
    );
  }
}
