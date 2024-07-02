import { AppUserType } from "./userModel.ts";

export type ContentTypeEnum = "MOVIE" | "SERIES" | "EXHIBITION";
export type ContentStatusEnum = "ACTIVE" | "DELETED" | "MERGED" | "ARCHIVED";

export type ContentType = {
  id: string;
  status: ContentStatusEnum;
  statusUpdatedAt: Date | null;
  statusUpdatedBy: AppUserType | null;
  contentType: ContentTypeEnum;
  originalTitle: string;
  englishTitle: string;
  germanTitle: string;
  createdBy: AppUserType;
  createdAt: Date;
};

export type NewContentType = {
  contentType: ContentTypeEnum | "";
  originalTitle: string;
  englishTitle: string;
  germanTitle: string;
};

export type UpdateContentTitlesType = {
  originalTitle: string;
  englishTitle: string;
  germanTitle: string;
};
