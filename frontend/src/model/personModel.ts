import { AppUserType } from "./userModel.ts";

export type PersonStatusEnum = "ACTIVE" | "DELETED" | "MERGED" | "ARCHIVED";

export type PersonType = {
  id: string;
  status: PersonStatusEnum;
  statusUpdatedAt: Date | null;
  statusUpdatedBy: AppUserType | null;
  firstName: string;
  lastName: string;
  createdBy: AppUserType;
  createdAt: Date;
};

export type NewPersonType = {
  firstName: string;
  lastName: string;
};
