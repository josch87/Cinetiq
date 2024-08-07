import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PersonTable from "./PersonTable.tsx";
import { peopleArray } from "../../../model/personTestData.ts";
import { MemoryRouter } from "react-router-dom";

test("PersonTable renders the last name of the user", () => {
  render(
    <MemoryRouter>
      <PersonTable people={peopleArray} isLoading={false} />
    </MemoryRouter>
  );
  const name = screen.getByText(/norris/i);
  expect(name).toBeInTheDocument();
});

test("PersonTable renders the first name of the user", () => {
  render(
    <MemoryRouter>
      <PersonTable people={peopleArray} isLoading={false} />
    </MemoryRouter>
  );
  const name = screen.getByText(/chuck/i);
  expect(name).toBeInTheDocument();
});

test("PersonTable renders the status of the user", () => {
  render(
    <MemoryRouter>
      <PersonTable people={peopleArray} isLoading={false} />
    </MemoryRouter>
  );
  const name = screen.getAllByText(/active/i);
  expect(name).toHaveLength(2);
});
