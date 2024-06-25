import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentCard from "./ContentCard.tsx";
import { contentType } from "../../../model/contentModel.ts";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { appUserType } from "../../../model/userModel.ts";

const user: appUserType = {
  id: "appUser-id-1",
  githubId: "github-id-1",
  createdAt: new Date("2024-06-10T15:10:05.217Z"),
};

const contentMovie: contentType = {
  id: "1",
  status: "ACTIVE",
  statusUpdatedAt: null,
  statusUpdatedBy: null,
  contentType: "MOVIE",
  originalTitle: "Original title",
  englishTitle: "English title",
  germanTitle: "German title",
  createdAt: new Date("2024-06-20T18:20:05.208Z"),
  createdBy: user,
};

const contentExhibition: contentType = {
  id: "1",
  status: "ACTIVE",
  statusUpdatedAt: null,
  statusUpdatedBy: null,
  contentType: "EXHIBITION",
  originalTitle: "Original title",
  englishTitle: "",
  germanTitle: "German title",
  createdAt: new Date("2024-06-20T18:20:05.208Z"),
  createdBy: user,
};

const contentSeries: contentType = {
  id: "1",
  status: "ACTIVE",
  statusUpdatedAt: null,
  statusUpdatedBy: null,
  contentType: "SERIES",
  originalTitle: "Original title",
  englishTitle: "",
  germanTitle: "",
  createdAt: new Date("2024-06-20T18:20:05.208Z"),
  createdBy: user,
};

test("ContentCard renders the english title of the content", () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentMovie} />
    </MemoryRouter>
  );
  const title = screen.getByText(/english title/i);
  expect(title).toBeInTheDocument();
});

test("ContentCard renders the german title of the content", () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentExhibition} />
    </MemoryRouter>
  );
  const title = screen.getByText(/german title/i);
  expect(title).toBeInTheDocument();
});

test("ContentCard renders the original title of the content", () => {
  render(
    <MemoryRouter>
      <ContentCard content={contentSeries} />
    </MemoryRouter>
  );
  const title = screen.getByText(/original title/i);
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
  const tooltipElement = screen.getByText(/movie/i);
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
  const tooltipElement = screen.getByText(/series/i);
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
  const tooltipElement = screen.getByText(/exhibition/i);
  expect(tooltipElement).toBeInTheDocument();
});
