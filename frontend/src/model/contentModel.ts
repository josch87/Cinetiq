import { appUserType } from "./userModel.ts";

export type contentType = {
  id: string;
  contentType: "MOVIE" | "SERIES";
  originalTitle: string;
  englishTitle: string;
  germanTitle: string;
  createdBy: appUserType;
  createdAt: Date;
};

export type infoType = {
  count: number;
};
