// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen } from "@testing-library/react";
import HeroCardBack from ".";

test("Should render the card back with the given test id", () => {
  renderWithProviders(
    <HeroCardBack alignment="good" size="lg" testId="player-card-back" />,
    { withRouter: false }
  );

  expect(screen.getByTestId("player-card-back")).toBeInTheDocument();
});

test("Should render the hero emblem for heroes", () => {
  const { container } = renderWithProviders(
    <HeroCardBack alignment="good" size="sm" testId="card-back" />,
    { withRouter: false }
  );

  expect(container.querySelector("svg")).toHaveAttribute("stroke", "#6FA8FF");
});

test("Should render the villain emblem for villains", () => {
  const { container } = renderWithProviders(
    <HeroCardBack alignment="bad" size="sm" testId="card-back" />,
    { withRouter: false }
  );

  expect(container.querySelector("svg")).toHaveAttribute("stroke", "#FF6B79");
});

test("Should render the reveal hint only when revealable", () => {
  const { rerender } = renderWithProviders(
    <HeroCardBack alignment="bad" size="lg" testId="card-back" />,
    { withRouter: false }
  );

  expect(screen.queryByText("REVEAL")).not.toBeInTheDocument();

  rerender(
    <HeroCardBack alignment="bad" size="lg" testId="card-back" revealable />
  );

  expect(screen.getByText("REVEAL")).toBeInTheDocument();
});
