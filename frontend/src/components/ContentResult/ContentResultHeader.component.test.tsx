import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentResultHeader from "./ContentResultHeader.tsx";

test("ContentResultHeader renders '0 results'", () => {
  render(<ContentResultHeader info={{ count: 0 }} />);
  const result = screen.getByText("0 results");
  expect(result).toBeInTheDocument();
});

test("ContentResultHeader renders '1 result'", () => {
  render(<ContentResultHeader info={{ count: 1 }} />);
  const result = screen.getByText("1 result");
  expect(result).toBeInTheDocument();
});

test("ContentResultHeader renders '2 results'", () => {
  render(<ContentResultHeader info={{ count: 2 }} />);
  const result = screen.getByText("2 results");
  expect(result).toBeInTheDocument();
});
