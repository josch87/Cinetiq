import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StaffTable from "./StaffTable.tsx";
import { appUserArray } from "../../../model/userTestData.ts";

test("StaffTable renders the name of the user", () => {
  render(<StaffTable appUsers={appUserArray} />);
  const name = screen.getByText(/githubname one/i);
  expect(name).toBeInTheDocument();
});

test("StaffTable renders the avatar of the user", () => {
  render(<StaffTable appUsers={appUserArray} />);
  const avatar = screen.getByRole("img", {
    name: /githubname one/i,
  });
  expect(avatar.textContent).toBe("go");
});
