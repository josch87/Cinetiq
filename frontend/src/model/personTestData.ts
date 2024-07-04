import { PersonType } from "./personModel.ts";
import { appUser } from "./userTestData.ts";

export const peopleSkeletonData: PersonType[] = [
  {
    id: "1",
    status: "ACTIVE",
    firstName: "Chuck",
    lastName: "Norris",
    createdBy: appUser,
    createdAt: new Date("2024-07-04T14:06:05"),
  },
];
