// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen, fireEvent } from "@testing-library/react";
import HeroCard from ".";
import { TEST_HERO_DATA } from "@/__fixtures__/testData";

test("Should render card data correctly", () => {
  renderWithProviders(<HeroCard data={TEST_HERO_DATA} />, {
    withRouter: false,
  });

  expect(screen.getByAltText(TEST_HERO_DATA.name)).toBeInTheDocument();
  expect(screen.getByText(TEST_HERO_DATA.name)).toBeInTheDocument();
  expect(screen.getByText(TEST_HERO_DATA.work.occupation)).toBeInTheDocument();
});

test("Should fall back to alignment label when occupation is missing", () => {
  const data = {
    ...TEST_HERO_DATA,
    work: { ...TEST_HERO_DATA.work, occupation: "-" },
  };
  renderWithProviders(<HeroCard data={data} />, { withRouter: false });

  expect(
    screen.getByText(data.biography.alignment === "good" ? "Hero" : "Villain")
  ).toBeInTheDocument();
});

test("Should render preview image", () => {
  renderWithProviders(<HeroCard data={TEST_HERO_DATA} />, {
    withRouter: false,
  });

  const previewBtn = screen.getByTestId("VisibilityIcon");

  expect(previewBtn).toBeInTheDocument();

  fireEvent.click(previewBtn);

  expect(screen.getAllByAltText(TEST_HERO_DATA.name)).toHaveLength(2);
});

test("Should render attack/defense correctly", () => {
  renderWithProviders(<HeroCard data={TEST_HERO_DATA} />, {
    withRouter: false,
  });

  expect(screen.getByText("ATK")).toBeInTheDocument();
  expect(screen.getByText("DEF")).toBeInTheDocument();
  expect(screen.getByTestId("hero-card-atk")).toHaveTextContent(
    String(TEST_HERO_DATA.values.attack)
  );
  expect(screen.getByTestId("hero-card-def")).toHaveTextContent(
    String(TEST_HERO_DATA.values.defense)
  );
});

test("Should show the small image at once and fade the full image in on load", () => {
  const { container } = renderWithProviders(<HeroCard data={TEST_HERO_DATA} />, {
    withRouter: false,
  });

  const placeholder = container.querySelector(
    `img[src="${TEST_HERO_DATA.images.xs}"]`
  );
  const image = screen.getByAltText(TEST_HERO_DATA.name);

  expect(placeholder).toHaveAttribute("alt", "");
  expect(image).toHaveAttribute("src", TEST_HERO_DATA.images.md);
  expect(image).toHaveAttribute("loading", "lazy");
  expect(image).toHaveAttribute("data-loaded", "false");

  fireEvent.load(image);

  expect(image).toHaveAttribute("data-loaded", "true");
});
