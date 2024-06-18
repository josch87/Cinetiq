import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardWidget from "./DashboardWidget.tsx";

test("DashboardWidget renders a heading", () => {
  render(
    <DashboardWidget heading="How to rule the world">
      <p>Ruling the world is not easy.</p>
    </DashboardWidget>
  );
  const heading = screen.getByRole("heading", {
    level: 2,
    name: /how to rule the world/i,
  });
  expect(heading).toBeInTheDocument();
});

test("DashboardWidget renders it's children", () => {
  render(
    <DashboardWidget heading="How to rule the world">
      <p>Ruling the world is not easy.</p>
    </DashboardWidget>
  );
  const children = screen.getByText(/ruling the world is not easy/i);
  expect(children).toBeInTheDocument();
});
