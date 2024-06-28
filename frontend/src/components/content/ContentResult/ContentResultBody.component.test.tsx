import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentResultBody from "./ContentResultBody.tsx";
import { ContentType } from "../../../model/contentModel.ts";
import { MemoryRouter } from "react-router-dom";
import { appUserType } from "../../../model/userModel.ts";

const user: appUserType = {
  id: "appUser-id-1",
  githubId: "github-id-1",
  createdAt: new Date("2024-06-10T15:10:05.217Z"),
};

const content: ContentType[] = [
  {
    id: "1",
    status: "ACTIVE",
    statusUpdatedAt: null,
    statusUpdatedBy: null,
    contentType: "MOVIE",
    originalTitle: "Original title of 1",
    englishTitle: "English title of 1",
    germanTitle: "German title of 1",
    createdAt: new Date("2024-06-20T18:20:05.208Z"),
    createdBy: user,
  },
  {
    id: "2",
    status: "ACTIVE",
    statusUpdatedAt: null,
    statusUpdatedBy: null,
    contentType: "EXHIBITION",
    originalTitle: "Original title of 2",
    englishTitle: "",
    germanTitle: "German title of 2",
    createdAt: new Date("2024-06-20T18:20:05.208Z"),
    createdBy: {
      id: "appUser-id-1",
      githubId: "github-id-1",
      createdAt: new Date("2024-06-10T15:10:05.217Z"),
    },
  },
];

test("ContentResultBody renders two ContentCards when array of size two with the title", () => {
  render(
    <MemoryRouter>
      <ContentResultBody content={content} />
    </MemoryRouter>
  );
  const title = screen.getByText(/english title of 1/i);
  const title2 = screen.getByText(/german title of 2/i);
  expect(title).toBeInTheDocument();
  expect(title2).toBeInTheDocument();
});
