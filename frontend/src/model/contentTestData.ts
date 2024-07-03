import { ContentType, ContentTypeEnum } from "./contentModel.ts";
import { appUser } from "./userTestData.ts";

export const contentMovie: ContentType = {
  id: "1",
  status: "ACTIVE",
  statusUpdatedAt: null,
  statusUpdatedBy: null,
  contentType: "MOVIE",
  originalTitle: "Original movie title",
  englishTitle: "English movie title",
  germanTitle: "German movie title",
  createdAt: new Date("2024-06-20T18:20:05.208Z"),
  createdBy: appUser,
};

export const contentExhibition: ContentType = {
  id: "2",
  status: "ACTIVE",
  statusUpdatedAt: null,
  statusUpdatedBy: null,
  contentType: "EXHIBITION",
  originalTitle: "Original exhibition title",
  englishTitle: "",
  germanTitle: "German exhibition title",
  createdAt: new Date("2024-06-20T18:20:05.208Z"),
  createdBy: appUser,
};

export const contentSeries: ContentType = {
  id: "3",
  status: "ACTIVE",
  statusUpdatedAt: null,
  statusUpdatedBy: null,
  contentType: "SERIES",
  originalTitle: "Original series title",
  englishTitle: "",
  germanTitle: "",
  createdAt: new Date("2024-06-20T18:20:05.208Z"),
  createdBy: appUser,
};

export const contentArray: ContentType[] = [
  contentMovie,
  contentSeries,
  contentExhibition,
];

export const contentSkeletonData: ContentType = {
  id: "1",
  status: "ACTIVE",
  statusUpdatedAt: new Date(),
  statusUpdatedBy: appUser,
  contentType: "MOVIE" as ContentTypeEnum,
  englishTitle: "test",
  germanTitle: "",
  originalTitle: "",
  createdBy: appUser,
  createdAt: new Date(),
};
