import { PersonType } from "./personModel.ts";
import { appUser } from "./userTestData.ts";

export const chuckNorris: PersonType = {
  id: "1",
  status: "ACTIVE",
  firstName: "Chuck",
  lastName: "Norris",
  createdBy: appUser,
  createdAt: new Date("2024-07-04T14:06:05"),
};

export const benjaminFranklin: PersonType = {
  id: "2",
  status: "ACTIVE",
  firstName: "Benjamin",
  lastName: "Franklin",
  createdBy: appUser,
  createdAt: new Date("2024-07-04T15:04:27"),
};

export const willSmith: PersonType = {
  id: "2",
  status: "ACTIVE",
  firstName: "Will",
  lastName: "Smith",
  createdBy: appUser,
  createdAt: new Date("2024-07-06T00:41:58"),
};

export const peopleArray: PersonType[] = [chuckNorris, benjaminFranklin];

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
