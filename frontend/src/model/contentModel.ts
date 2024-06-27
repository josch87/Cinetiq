import { appUserType } from "./userModel.ts";

export type ContentTypeEnum = "MOVIE" | "SERIES" | "EXHIBITION";
export type ContentStatusEnum = "ACTIVE" | "DELETED" | "MERGED" | "ARCHIVED";

export type ContentType = {
  id: string;
  status: ContentStatusEnum;
  statusUpdatedAt: Date | null;
  statusUpdatedBy: appUserType | null;
  contentType: ContentTypeEnum;
  originalTitle: string;
  englishTitle: string;
  germanTitle: string;
  createdBy: appUserType;
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

export const contentSkeletonData: ContentType = {
  id: "1",
  status: "ACTIVE",
  statusUpdatedAt: new Date(),
  statusUpdatedBy: {
    id: "1",
    githubId: "2",
    createdAt: new Date(),
  },
  contentType: "MOVIE" as ContentTypeEnum,
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
