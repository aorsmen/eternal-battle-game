// @ts-nocheck
import { render, screen } from "@testing-library/react";
import VersusEmblem from ".";

test("Should draw the decorative VS diamond at the given size", () => {
  const { container } = render(<VersusEmblem size={96} />);
  const svg = container.querySelector("svg");

  expect(svg).toHaveAttribute("aria-hidden", "true");
  expect(svg).toHaveAttribute("width", "96");
  expect(screen.getByText("VS")).toBeInTheDocument();
});
