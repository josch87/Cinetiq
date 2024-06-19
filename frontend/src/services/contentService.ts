import axios from "axios";
import { contentType } from "../model/contentModel.ts";

export function getContent(): Promise<contentType[] | null> {
  return axios
    .get("/api/content")
    .then((response) => processContent(response.data.data))
    .catch((error) => {
      console.error(error.message);
      return null;
    });
}

function processContent(rawContent: contentType[]): contentType[] {
  return rawContent.map((content) => {
    return { ...content, createdAt: new Date(content.createdAt) };
  });
}
