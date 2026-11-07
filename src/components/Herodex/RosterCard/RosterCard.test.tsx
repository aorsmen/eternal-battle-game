// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import RosterCard from ".";
import { TEST_HERO_DATA } from "@/__fixtures__/testData";

const HERO = {
  id: TEST_HERO_DATA.id,
  name: TEST_HERO_DATA.name,
  role: "Adventurer",
  aliases: [],
  side: "heroes",
  images: TEST_HERO_DATA.images,
  values: { attack: 4, defense: 5 },
};

const renderCard = (props = {}) => {
  const onToggleCompare = vi.fn();
  renderWithProviders(
    <RosterCard
      hero={HERO}
      selected={false}
      compareFull={false}
      onToggleCompare={onToggleCompare}
      {...props}
    />,
    { withRouter: true }
  );
  return { onToggleCompare };
};

test("Should render name, role, stats and a details link", () => {
  renderCard();

  expect(screen.getByText(HERO.name)).toBeInTheDocument();
  expect(screen.getByText(HERO.role)).toBeInTheDocument();
  expect(screen.getByTestId("hero-card-atk")).toHaveTextContent("4");
  expect(screen.getByTestId("hero-card-def")).toHaveTextContent("5");
  expect(screen.getByTestId("roster-card-badge-heroes")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: `${HERO.name}, open details` })
  ).toHaveAttribute("href", `/herodex/${HERO.id}`);
});

test("Should toggle compare with the hero id", () => {
  const { onToggleCompare } = renderCard();

  const button = screen.getByRole("button", { name: `Compare: ${HERO.name}` });
  expect(button).toHaveAttribute("aria-pressed", "false");

  fireEvent.click(button);

  expect(onToggleCompare).toHaveBeenCalledWith(HERO.id);
});

test("Should show the selected state", () => {
  renderCard({ selected: true, compareFull: true });

  const button = screen.getByRole("button", {
    name: `In compare: ${HERO.name}`,
  });
  expect(button).toHaveAttribute("aria-pressed", "true");
  expect(button).toBeEnabled();
});

test("Should disable compare when the tray is full", () => {
  const { onToggleCompare } = renderCard({ compareFull: true });

  const button = screen.getByRole("button", {
    name: `Compare full: ${HERO.name}`,
  });
  expect(button).toBeDisabled();

  fireEvent.click(button);
  expect(onToggleCompare).not.toHaveBeenCalled();
});
