// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen } from "@testing-library/react";
import CharacterAppearance from ".";
import { TEST_HERO_DATA } from "@/__fixtures__/testData";

const renderAppearance = (appearance = {}) =>
  renderWithProviders(
    <CharacterAppearance
      hero={{
        ...TEST_HERO_DATA,
        appearance: { ...TEST_HERO_DATA.appearance, ...appearance },
      }}
    />,
    { withRouter: false }
  );

test("Should render appearance tiles, measurements and the height figure", () => {
  renderAppearance();

  expect(screen.getByText("Human")).toBeInTheDocument();
  expect(screen.getByText("Female")).toBeInTheDocument();
  expect(screen.getByText("Auburn")).toBeInTheDocument();
  expect(screen.getByText("Green")).toBeInTheDocument();
  expect(screen.getByText("170")).toBeInTheDocument();
  expect(screen.getByText("5'7")).toBeInTheDocument();
  expect(screen.getByText("59")).toBeInTheDocument();
  expect(screen.getByText("131 lb")).toBeInTheDocument();
  expect(
    screen.getByRole("img", {
      name: /black widow at 170 cm next to a 183 cm/i,
    })
  ).toBeInTheDocument();
});

test("Should show unknown values without a height figure", () => {
  renderAppearance({
    race: null,
    hairColor: "No Hair",
    height: ["-", "0 cm"],
    weight: ["-", "0 kg"],
  });

  expect(screen.getAllByText("Unknown")).toHaveLength(3);
  expect(screen.getByText("No Hair")).toBeInTheDocument();
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});
