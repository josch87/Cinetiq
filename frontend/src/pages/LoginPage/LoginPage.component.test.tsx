import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "./LoginPage.tsx";
import { MemoryRouter } from "react-router-dom";

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
