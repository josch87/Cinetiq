import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "./LoadingSpinner.tsx";

test("LoadingSpinner renders a loading spinner", () => {
  render(<LoadingSpinner />);
  const icon = screen.getByText(/loading.../i);
  expect(icon).toBeInTheDocument();
});
