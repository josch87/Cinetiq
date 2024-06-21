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

export const contentSkeletonData: contentType = {
  id: "1",
  contentType: "MOVIE" as contentTypeEnum,
  englishTitle: "test",
  germanTitle: "",
  originalTitle: "",
  createdBy: {
    id: "1",
    githubId: "2",
    createdAt: new Date(),
  },
  createdAt: new Date(),
};

export type contentTypeEnum = "MOVIE" | "SERIES" | "EXHIBITION";

export type infoType = {
  count: number;
};
