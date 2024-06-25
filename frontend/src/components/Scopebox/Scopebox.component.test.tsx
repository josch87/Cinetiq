import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Scopebox from "./Scopebox.tsx";

test("Scopebox renders its title", () => {
  render(
    <Scopebox heading="My awesome scopebox">
      <p>I am a child paragraph.</p>
    </Scopebox>
  );
  const title = screen.getByRole("heading", {
    level: 2,
    name: /My awesome scopebox/i,
  });
  expect(title).toBeInTheDocument();
});

test("Scopebox renders its children", () => {
  render(
    <Scopebox heading="My awesome scopebox">
      <p>I am a child paragraph.</p>
    </Scopebox>
  );
  const childText = screen.getByText(/I am a child paragraph./i);
  expect(childText).toBeInTheDocument();
});

test("Scopebox renders an edit button when prop is present", () => {
  render(
    <Scopebox heading="My awesome scopebox" isEditable>
      <p>I am a child paragraph.</p>
    </Scopebox>
  );
  const editButton = screen.getByRole("button", {
    name: /edit/i,
  });
  expect(editButton).toBeInTheDocument();
});

test("Scopebox renders an edit button when prop is true", () => {
  render(
    <Scopebox heading="My awesome scopebox" isEditable={true}>
      <p>I am a child paragraph.</p>
    </Scopebox>
  );
  const editButton = screen.getByRole("button", {
    name: /edit/i,
  });
  expect(editButton).toBeInTheDocument();
});

test("Scopebox does not render an edit button when prop is not present", () => {
  render(
    <Scopebox heading="My awesome scopebox">
      <p>I am a child paragraph.</p>
    </Scopebox>
  );
  const editButton = screen.queryByRole("button", {
    name: /edit/i,
  });
  expect(editButton).not.toBeInTheDocument();
});

test("Scopebox does not render an edit button when prop is false", () => {
  render(
    <Scopebox heading="My awesome scopebox" isEditable={false}>
      <p>I am a child paragraph.</p>
    </Scopebox>
  );
  const editButton = screen.queryByRole("button", {
    name: /edit/i,
  });
  expect(editButton).not.toBeInTheDocument();
});
