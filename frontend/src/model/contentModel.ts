import { appUserType } from "./userModel.ts";

export type contentType = {
  id: string;
  originalTitle: string;
  englishTitle: string;
  germanTitle: string;
  createdBy: appUserType;
  createdAt: Date;
  edition: number;
};
