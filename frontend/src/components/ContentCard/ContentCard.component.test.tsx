import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentCard from "./ContentCard.tsx";
import { contentType } from "../../model/contentModel.ts";
import { userEvent } from "@testing-library/user-event";

const contentMovie: contentType = {
  id: "1",
  contentType: "MOVIE",
  originalTitle: "Original title",
  englishTitle: "English title",
  germanTitle: "German title",
  createdAt: new Date("2024-06-20T18:20:05.208Z"),
  createdBy: {
    id: "appUser-id-1",
    githubId: "github-id-1",
    createdAt: new Date("2024-06-10T15:10:05.217Z"),
  },
};

const contentExhibition: contentType = {
  id: "1",
  contentType: "EXHIBITION",
  originalTitle: "Original title",
  englishTitle: "",
  germanTitle: "German title",
  createdAt: new Date("2024-06-20T18:20:05.208Z"),
  createdBy: {
    id: "appUser-id-1",
    githubId: "github-id-1",
    createdAt: new Date("2024-06-10T15:10:05.217Z"),
  },
};

test("ContentCard renders the english title of the content", () => {
  render(<ContentCard content={contentMovie} />);
  const title = screen.getByText(/english title/i);
  expect(title).toBeInTheDocument();
});

test("ContentCard renders the german title of the content", () => {
  render(<ContentCard content={contentExhibition} />);
  const title = screen.getByText(/german title/i);
  expect(title).toBeInTheDocument();
});

test("ContentCard renders a svg icon for the content type 'movie'", () => {
  render(<ContentCard content={contentMovie} />);
  const svgIcon = screen.getByTestId("svg-icon-contenttype-movie");
  expect(svgIcon).toBeInTheDocument();
});

test("ContentCard renders a svg icon for the content type 'exhibition'", () => {
  render(<ContentCard content={contentExhibition} />);
  const svgIcon = screen.getByTestId("svg-icon-contenttype-exhibition");
  expect(svgIcon).toBeInTheDocument();
});

test("ContentCard renders a tooltip for the content type on icon hover", async () => {
  render(<ContentCard content={contentMovie} />);
  const svgIcon = screen.getByTestId("svg-icon-contenttype-movie");
  await userEvent.hover(svgIcon);
  const tooltipElement = screen.getByText(/movie/i);
  expect(tooltipElement).toBeInTheDocument();
});
