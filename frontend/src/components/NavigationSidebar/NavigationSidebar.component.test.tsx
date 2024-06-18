import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavigationSidebar from "./NavigationSidebar.tsx";
import { githubUserType } from "../../model/userModel.ts";
import { MemoryRouter } from "react-router-dom";

const user: githubUserType = {
  id: "11111",
  name: "Chuck Norris",
};

test("NavigationSidebar renders the name of the user", () => {
  render(
    <MemoryRouter>
      <NavigationSidebar user={user} />
    </MemoryRouter>
  );
  const name = screen.getByText(/chuck norris/i);
  expect(name).toBeInTheDocument();
});

test("NavigationSidebar renders the users initials when no Avatar image loaded", () => {
  render(
    <MemoryRouter>
      <NavigationSidebar user={user} />
    </MemoryRouter>
  );
  const avatar = screen.getByRole("img", {
    name: /chuck norris/i,
  });
  expect(avatar.textContent).toBe("CN");
});

test("NavigationSidebar renders a logout button", () => {
  render(
    <MemoryRouter>
      <NavigationSidebar user={user} />
    </MemoryRouter>
  );
  const logoutText = screen.getByText(/logout/i);
  expect(logoutText).toBeInTheDocument();
});
