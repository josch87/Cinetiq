import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavigationSidebar from "./NavigationSidebar.tsx";
import { MemoryRouter } from "react-router-dom";
import { githubUserLoggedIn } from "../../model/githubTestData.ts";

test("NavigationSidebar renders the name of the user", () => {
  render(
    <MemoryRouter>
      <NavigationSidebar user={githubUserLoggedIn} />
    </MemoryRouter>
  );
  const name = screen.getByText(/loggedin name/i);
  expect(name).toBeInTheDocument();
});

test("NavigationSidebar renders the users initials when no Avatar image loaded", () => {
  render(
    <MemoryRouter>
      <NavigationSidebar user={githubUserLoggedIn} />
    </MemoryRouter>
  );
  const avatar = screen.getByRole("img", {
    name: /loggedin name/i,
  });
  expect(avatar.textContent).toBe("ln");
});

test("NavigationSidebar renders a logout button", () => {
  render(
    <MemoryRouter>
      <NavigationSidebar user={githubUserLoggedIn} />
    </MemoryRouter>
  );
  const logoutText = screen.getByText(/logout/i);
  expect(logoutText).toBeInTheDocument();
});
