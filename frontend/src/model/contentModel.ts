import { appUserType } from "./userModel.ts";

export type contentType = {
  id: string;
  status: "ACTIVE" | "DELETED" | "MERGED" | "ARCHIVED";
  statusUpdatedAt: Date | null;
  statusUpdatedBy: appUserType | null;
  contentType: contentTypeEnum;
  originalTitle: string;
  englishTitle: string;
  germanTitle: string;
  createdBy: appUserType;
  createdAt: Date;
};

export const contentSkeletonData: contentType = {
  id: "1",
  status: "ACTIVE",
  statusUpdatedAt: new Date(),
  statusUpdatedBy: {
    id: "1",
    githubId: "2",
    createdAt: new Date(),
  },
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
  count: number | null;
};
