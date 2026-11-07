// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen } from "@testing-library/react";
import CharacterStats from ".";
import { TEST_HERO_DATA } from "@/__fixtures__/testData";

test("Should render a bar for every stat and skill", () => {
  renderWithProviders(<CharacterStats hero={TEST_HERO_DATA} />, {
    withRouter: false,
  });

  expect(screen.getByRole("region", { name: "Stats" })).toBeInTheDocument();
  expect(screen.getByRole("region", { name: "Skills" })).toBeInTheDocument();
  expect(screen.getAllByRole("meter")).toHaveLength(12);
  expect(screen.getByRole("meter", { name: "Combat" })).toHaveAttribute(
    "aria-valuenow",
    "100"
  );
  expect(screen.getByRole("meter", { name: "Evasion" })).toHaveAttribute(
    "aria-valuenow",
    "69"
  );
});
