import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentCard from "./ContentCard.tsx";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import {
  contentExhibition,
  contentMovie,
  contentSeries,
} from "../../../model/contentTestData.ts";

test("ContentCard renders the english title of the content", () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentMovie} />
    </MemoryRouter>
  );
  const title = screen.getByText(/english movie title/i);
  expect(title).toBeInTheDocument();
});

test("ContentCard renders the german title of the content", () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentExhibition} />
    </MemoryRouter>
  );
  const title = screen.getByText(/german exhibition title/i);
  expect(title).toBeInTheDocument();
});

test("ContentCard renders the original title of the content", () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentSeries} />
    </MemoryRouter>
  );
  const title = screen.getByText(/original series title/i);
  expect(title).toBeInTheDocument();
});

test("ContentCard renders a svg icon for the content type 'movie'", () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentMovie} />
    </MemoryRouter>
  );
  const svgIcon = screen.getByTestId("svg-icon-contenttype-movie");
  expect(svgIcon).toBeInTheDocument();
});

test("ContentCard renders a svg icon for the content type 'series'", () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentSeries} />
    </MemoryRouter>
  );
  const svgIcon = screen.getByTestId("svg-icon-contenttype-series");
  expect(svgIcon).toBeInTheDocument();
});

test("ContentCard renders a svg icon for the content type 'exhibition'", () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentExhibition} />
    </MemoryRouter>
  );
  const svgIcon = screen.getByTestId("svg-icon-contenttype-exhibition");
  expect(svgIcon).toBeInTheDocument();
});

test("ContentCard renders a tooltip for the content type 'movie' on icon hover", async () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentMovie} />
    </MemoryRouter>
  );
  const svgIcon = screen.getByTestId("svg-icon-contenttype-movie");
  await userEvent.hover(svgIcon);
  const tooltipElement = screen.getByRole("tooltip", {
    name: /movie/i,
  });
  expect(tooltipElement).toBeInTheDocument();
});

test("ContentCard renders a tooltip for the content type 'Series' on icon hover", async () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentSeries} />
    </MemoryRouter>
  );
  const svgIcon = screen.getByTestId("svg-icon-contenttype-series");
  await userEvent.hover(svgIcon);
  const tooltipElement = screen.getByRole("tooltip", {
    name: /series/i,
  });
  expect(tooltipElement).toBeInTheDocument();
});

test("ContentCard renders a tooltip for the content type 'Exhibition' on icon hover", async () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentExhibition} />
    </MemoryRouter>
  );
  const svgIcon = screen.getByTestId("svg-icon-contenttype-exhibition");
  await userEvent.hover(svgIcon);
  const tooltipElement = screen.getByRole("tooltip", {
    name: /exhibition/i,
  });
  expect(tooltipElement).toBeInTheDocument();
});
