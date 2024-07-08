import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NoData from "./NoData.tsx";

test("NoData renders a default text", () => {
  render(<NoData />);
  const text = screen.getByText(/no data found/i);
  expect(text).toBeInTheDocument();
});

test("NoData renders a random data-dog as default image", () => {
  render(<NoData />);
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
  expect(image.getAttribute("src")).toEqual(
    expect.stringMatching(/no-data-dog/i)
  );
});

test("NoData renders a custom text", () => {
  render(<NoData text="My custom text" />);
  const text = screen.getByText(/my custom text/i);
  expect(text).toBeInTheDocument();
});

test("NoData renders a random default image", () => {
  render(<NoData image="SNIFFING_DOG" />);
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
  expect(image.getAttribute("src")).toEqual(
    expect.stringMatching(/sniffing-dog/i)
  );
});
