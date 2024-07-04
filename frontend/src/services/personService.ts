import { ApiResponseType } from "../model/apiModel.ts";
import axios, { AxiosError, AxiosResponse } from "axios";
import { PersonType } from "../model/personModel.ts";
import { AppUserType } from "../model/userModel.ts";
import { processSingleAppUser } from "./userService.ts";

function processSinglePerson(rawPerson: PersonType): PersonType {
  const createdBy: AppUserType = processSingleAppUser(rawPerson.createdBy);
  const statusUpdatedBy = rawPerson.statusUpdatedBy
    ? processSingleAppUser(rawPerson.statusUpdatedBy)
    : null;

  return {
    ...rawPerson,
    createdBy: createdBy,
    createdAt: new Date(rawPerson.createdAt),
    statusUpdatedBy: statusUpdatedBy,
    statusUpdatedAt: rawPerson.statusUpdatedAt
      ? new Date(rawPerson.statusUpdatedAt)
      : null,
  };
}

function processPeopleArray(rawPeople: PersonType[]): PersonType[] {
  return rawPeople.map((person) => {
    return processSinglePerson(person);
  });
}

export function getPeople(): Promise<ApiResponseType<PersonType[]> | null> {
  return axios
    .get("/api/people")
    .then((response: AxiosResponse<ApiResponseType<PersonType[]>, any>) => {
      const people = processPeopleArray(response.data.data);
      const returnValue: ApiResponseType<PersonType[]> = {
        info: response.data.info,
        data: people,
      };
      return returnValue;
    })
    .catch((error: AxiosError) => {
      console.error(error.message);
      return null;
    });
}
