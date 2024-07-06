import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResultHeader from "./ResultHeader.tsx";

test("ResultHeader renders '0 results'", () => {
  render(<ResultHeader info={{ count: 0 }} isLoading={false} />);
  const result = screen.getByText("0 results");
  expect(result).toBeInTheDocument();
});

test("ResultHeader renders '1 result'", () => {
  render(<ResultHeader info={{ count: 1 }} isLoading={false} />);
  const result = screen.getByText("1 result");
  expect(result).toBeInTheDocument();
});

test("ResultHeader renders '2 results'", () => {
  render(<ResultHeader info={{ count: 2 }} isLoading={false} />);
  const result = screen.getByText("2 results");
  expect(result).toBeInTheDocument();
});
