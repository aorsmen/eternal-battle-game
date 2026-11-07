// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ActionButton, { ArrowIcon } from ".";

test("Should render a button that calls onClick", () => {
  const onClick = vi.fn();

  renderWithProviders(
    <ActionButton onClick={onClick} icon={<ArrowIcon />}>
      Next round
    </ActionButton>,
    { withRouter: false }
  );

  fireEvent.click(screen.getByRole("button", { name: /next round/i }));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("Should render a link when given a route", () => {
  renderWithProviders(
    <ActionButton variant="ghost" to="/">
      Home
    </ActionButton>,
    { withRouter: true }
  );

  expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
    "href",
    "/"
  );
});
