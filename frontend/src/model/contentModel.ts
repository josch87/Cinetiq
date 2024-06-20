import { appUserType } from "./userModel.ts";

export type contentType = {
  id: string;
  contentType: contentTypeEnum;
  originalTitle: string;
  englishTitle: string;
  germanTitle: string;
  createdBy: appUserType;
  createdAt: Date;
};

export type contentTypeEnum = "MOVIE" | "SERIES" | "EXHIBITION";

export type infoType = {
  count: number;
};
