import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentDetailsTabs from "./ContentDetailsTabs.tsx";
import { appUserType } from "../../../model/userModel.ts";
import { ContentType } from "../../../model/contentModel.ts";

const user: appUserType = {
  id: "appUser-id-1",
  githubId: "github-id-1",
  createdAt: new Date("2024-06-10T15:10:05.217Z"),
};

const contentMovie: ContentType = {
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

test("ContentDetailsTabs renders tab 'Basics'", () => {
  render(<ContentDetailsTabs content={contentMovie} />);
  const basicsTab = screen.getByRole("tab", {
    name: /basics/i,
  });
  expect(basicsTab).toBeInTheDocument();
});

test("ContentDetailsTabs renders tab 'Basics'", () => {
  render(<ContentDetailsTabs content={contentMovie} />);
  const basicsTab = screen.getByRole("tabpanel");
  expect(basicsTab).toBeInTheDocument();
});
