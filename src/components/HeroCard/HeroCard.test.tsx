// @ts-nocheck
import { renderWithProviders } from "../../__fixtures__/renderWithProviders";
import { screen, fireEvent } from "@testing-library/react";
import HeroCard from ".";
import { TEST_HERO_DATA } from "../../__fixtures__/testData";

test("Should render card data correctly", () => {
  renderWithProviders(<HeroCard data={TEST_HERO_DATA} />, {
    withRouter: false,
  });

  const image = screen.getByAltText(TEST_HERO_DATA.name);
  const name = screen.getByText(TEST_HERO_DATA.name);
  const type = screen.getByText(
    TEST_HERO_DATA.biography.alignment === "good" ? "Hero" : "Villain"
  );
  const desc = screen.getByText(TEST_HERO_DATA.work.occupation);

  expect(image).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  expect(desc).toBeInTheDocument();
});

test("Should render preview image", () => {
  renderWithProviders(<HeroCard data={TEST_HERO_DATA} />, {
    withRouter: false,
  });

  const previewBtn = screen.getByTestId("VisibilityIcon");

  expect(previewBtn).toBeInTheDocument();

  fireEvent.click(previewBtn);

  const image = screen.getAllByAltText(TEST_HERO_DATA.name);

  expect(image).toHaveLength(2);
});

test("Should render attack/defense correctly", () => {
  renderWithProviders(<HeroCard data={TEST_HERO_DATA} />, {
    withRouter: false,
  });

  const values = screen.getByText(
    `${TEST_HERO_DATA.values.attack}/${TEST_HERO_DATA.values.defense}`
  );

  expect(values).toBeInTheDocument();
});
