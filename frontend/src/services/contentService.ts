import axios, { AxiosError } from "axios";
import { ContentType } from "../model/contentModel.ts";
import { ApiResponseType } from "../model/apiModel.ts";
import { AppUserType } from "../model/userModel.ts";
import { processSingleAppUser } from "./userService.ts";

export function processSingleContent(rawContent: ContentType): ContentType {
  const createdBy: AppUserType = processSingleAppUser(rawContent.createdBy);
  const statusUpdatedBy = rawContent.statusUpdatedBy
    ? processSingleAppUser(rawContent.statusUpdatedBy)
    : null;

  return {
    ...rawContent,
    createdAt: new Date(rawContent.createdAt),
    createdBy: createdBy,
    statusUpdatedBy: statusUpdatedBy,
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

export function getContent(): Promise<ApiResponseType<ContentType[]> | null> {
  return axios
    .get("/api/content")
    .then((response) => {
      const content = processContentArray(response.data.data);
      return {
        info: response.data.info,
        data: content,
      };
    })
    .catch((error) => {
      console.error(error.message);
      return null;
    });
}

export function getContentById(
  id: string
): Promise<ApiResponseType<ContentType> | null> {
  return axios
    .get(`/api/content/${id}`)
    .then((response) => {
      const content = processSingleContent(response.data.data);
      const returnValue: ApiResponseType<ContentType> = {
        info: response.data.info,
        data: content,
      };
      return returnValue;
    })
    .catch((error: AxiosError) => {
      console.error(error.message);
      return null;
    });
}
