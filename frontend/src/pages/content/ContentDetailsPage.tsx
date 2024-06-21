import { useParams } from "react-router-dom";
import { getContentById } from "../../services/contentService.ts";
import { useEffect, useState } from "react";
import { contentType, infoType } from "../../model/contentModel.ts";
import DefaultPageTemplate from "../templates/DefaultPageTemplate.tsx";
import { githubUserType } from "../../model/userModel.ts";

type ContentDetailsPageProps = {
  user: githubUserType | null | undefined;
};

export default function ContentDetailsPage({
  user,
}: Readonly<ContentDetailsPageProps>) {
  const params = useParams();
  const id: string | undefined = params.id;

  const [info, setInfo] = useState<infoType | undefined | null>(undefined);
  const [content, setContent] = useState<contentType | undefined | null>(
    undefined
  );

  useEffect(() => {
    if (id) {
      getContentById(id)
        .then((response) => {
          if (response) {
            setInfo(response.info);
            setContent(response.content);
          } else {
            setInfo(null);
            setContent(null);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setInfo(null);
          setContent(null);
        });
    }
  }, [id]);

  return (
    <DefaultPageTemplate
      pageTitle={"Content Details"}
      pageSubtitle="Display details of the content"
      user={user}
    >
      {content?.originalTitle} {id}
    </DefaultPageTemplate>
  );
}
