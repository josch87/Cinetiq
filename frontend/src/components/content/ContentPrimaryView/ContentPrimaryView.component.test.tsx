import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentPrimaryView from "./ContentPrimaryView.tsx";
import axios from "axios";
import { contentMovie } from "../../../model/contentTestData.ts";
import { githubUser } from "../../../model/githubTestData.ts";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("ContentPrimaryView renders its heading", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: githubUser });
  render(<ContentPrimaryView content={contentMovie} />);

  await waitFor(async () => {
    const heading = await screen.findByRole("heading", {
      level: 3,
      name: /primary view/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

test("ContentPrimaryView renders the english title", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: githubUser });
  render(<ContentPrimaryView content={contentMovie} />);

  await waitFor(async () => {
    const title = await screen.findByText(/english movie title/i);
    expect(title).toBeInTheDocument();
  });
});

test("ContentPrimaryView renders the german title", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: githubUser });
  render(<ContentPrimaryView content={contentMovie} />);

  await waitFor(async () => {
    const title = await screen.findByText(/german movie title/i);
    expect(title).toBeInTheDocument();
  });
});

test("ContentPrimaryView renders the original title", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: githubUser });
  render(<ContentPrimaryView content={contentMovie} />);

  await waitFor(async () => {
    const title = await screen.findByText(/original movie title/i);
    expect(title).toBeInTheDocument();
  });
});

test("ContentPrimaryView renders the authors name from GitHub", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: githubUser });
  render(<ContentPrimaryView content={contentMovie} />);

  await waitFor(async () => {
    const authorName = await screen.findByText(/githubname one/i);
    expect(authorName).toBeInTheDocument();
  });
});
