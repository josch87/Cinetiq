import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentDetailsHeader from "./ContentDetailsHeader.tsx";
import { ContentType } from "../../../model/contentModel.ts";
import { MemoryRouter } from "react-router-dom";
import { appUserType } from "../../../model/userModel.ts";

const user: appUserType = {
  id: "appUser-id-1",
  githubId: "github-id-1",
  createdAt: new Date("2024-06-10T15:10:05.217Z"),
};

const content: ContentType = {
  id: "1",
  status: "ACTIVE",
  statusUpdatedBy: null,
  statusUpdatedAt: null,
  contentType: "MOVIE",
  originalTitle: "Original title of 1",
  englishTitle: "English title of 1",
  germanTitle: "German title of 1",
  createdAt: new Date("2024-06-20T18:20:05.208Z"),
  createdBy: user,
};

test("ContentDetailsHeader renders the english title", () => {
  render(
    <MemoryRouter>
      <ContentDetailsHeader content={content} />
    </MemoryRouter>
  );
  const title = screen.getByRole("heading", {
    level: 2,
    name: /english title of 1/i,
  });
  expect(title).toBeInTheDocument();
});
