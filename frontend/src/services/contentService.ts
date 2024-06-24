import axios from "axios";
import { contentType, infoType } from "../model/contentModel.ts";

function processSingleContent(rawContent: contentType): contentType {
  return {
    ...rawContent,
    createdAt: new Date(rawContent.createdAt),
    statusUpdatedAt: rawContent.statusUpdatedAt
      ? new Date(rawContent.statusUpdatedAt)
      : null,
  };
}

function processContentArray(rawContent: contentType[]): contentType[] {
  return rawContent.map((content) => {
    return processSingleContent(content);
  });
}

export function getContent(): Promise<{
  info: infoType;
  content: contentType[];
} | null> {
  return axios
    .get("/api/content")
    .then((response) => {
      const content = processContentArray(response.data.data);
      return { info: response.data.info, content };
    })
    .catch((error) => {
      console.error(error.message);
      return null;
    });
}

export function getContentById(
  id: string
): Promise<{ info: infoType; content: contentType } | null> {
  return axios
    .get(`/api/content/${id}`)
    .then((response) => {
      const content = processSingleContent(response.data.data);
      return { info: response.data.info, content };
    })
    .catch((error) => {
      console.error(error.message);
      return null;
    });
}
