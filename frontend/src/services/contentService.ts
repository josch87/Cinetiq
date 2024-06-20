import axios from "axios";
import { contentType, infoType } from "../model/contentModel.ts";

export function getContent(): Promise<{
  info: infoType;
  content: contentType[];
} | null> {
  return axios
    .get("/api/content")
    .then((response) => {
      const content = processContent(response.data.data);
      return { info: response.data.info, content };
    })
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
