import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "./LoginPage.tsx";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../services/userService.ts", () => ({
  isLoggedIn: jest.fn().mockResolvedValue(false),
}));

test("LoginPage renders the logo of Cinetiq", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const logo = screen.getByRole("img", {
    name: /logo of cinetiq/i,
  });
  expect(logo).toBeInTheDocument();
});

test("LoginPage renders a button to login with GitHub", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const button = screen.getByRole("button", {
    name: /login with github/i,
  });
  expect(button).toBeInTheDocument();
});
