import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentDetailsTabs from "./ContentDetailsTabs.tsx";
import { ContentType } from "../../../model/contentModel.ts";
import { appUser } from "../../../model/userTestData.ts";

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
  createdBy: appUser,
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
