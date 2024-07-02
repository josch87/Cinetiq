import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentResultBody from "./ContentResultBody.tsx";
import { MemoryRouter } from "react-router-dom";
import { contentArray } from "../../../model/contentTestData.ts";

test("ContentResultBody renders three ContentCards when array of size three with the title", () => {
  render(
    <MemoryRouter>
      <ContentResultBody content={contentArray} />
    </MemoryRouter>
  );
  const titleOfMovie = screen.getByText(/english movie title/i);
  const titleOfExhibition = screen.getByText(/german exhibition title/i);
  const titleOfSeries = screen.getByText(/original series title/i);
  expect(titleOfMovie).toBeInTheDocument();
  expect(titleOfExhibition).toBeInTheDocument();
  expect(titleOfSeries).toBeInTheDocument();
});
