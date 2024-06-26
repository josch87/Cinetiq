import axios from "axios";
import { ContentType, InfoType } from "../model/contentModel.ts";

function processSingleContent(rawContent: ContentType): ContentType {
  return {
    ...rawContent,
    createdAt: new Date(rawContent.createdAt),
    statusUpdatedAt: rawContent.statusUpdatedAt
      ? new Date(rawContent.statusUpdatedAt)
      : null,
  };
}

function processContentArray(rawContent: ContentType[]): ContentType[] {
  return rawContent.map((content) => {
    return processSingleContent(content);
  });
}

export function getContent(): Promise<{
  info: InfoType;
  content: ContentType[];
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
): Promise<{ info: InfoType; content: ContentType } | null> {
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
