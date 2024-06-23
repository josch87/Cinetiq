import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { contentType } from "../../../model/contentModel.ts";
import ContentPrimaryView from "./ContentPrimaryView.tsx";
import { githubUserType } from "../../../model/userModel.ts";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const content: contentType = {
  id: "1",
  contentType: "MOVIE",
  originalTitle: "Original title of 1",
  englishTitle: "English title of 1",
  germanTitle: "German title of 1",
  createdAt: new Date("2024-06-20T18:20:05.208Z"),
  createdBy: {
    id: "appUser-id-1",
    githubId: "github-id-1",
    createdAt: new Date("2024-06-10T15:10:05.217Z"),
  },
};

const githubProfile: githubUserType = {
  id: "github-id-1",
  name: "My GitHub name",
  company: "My GitHub Company",
};

test("ContentPrimaryView renders its heading", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: githubProfile });
  render(<ContentPrimaryView content={content} />);

  await waitFor(async () => {
    const heading = await screen.findByRole("heading", {
      level: 3,
      name: /primary view/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

test("ContentPrimaryView renders the english title", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: githubProfile });
  render(<ContentPrimaryView content={content} />);

  await waitFor(async () => {
    const title = await screen.findByText(/english title of 1/i);
    expect(title).toBeInTheDocument();
  });
});

test("ContentPrimaryView renders the german title", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: githubProfile });
  render(<ContentPrimaryView content={content} />);

  await waitFor(async () => {
    const title = await screen.findByText(/german title of 1/i);
    expect(title).toBeInTheDocument();
  });
});

test("ContentPrimaryView renders the original title", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: githubProfile });
  render(<ContentPrimaryView content={content} />);

  await waitFor(async () => {
    const title = await screen.findByText(/original title of 1/i);
    expect(title).toBeInTheDocument();
  });
});
