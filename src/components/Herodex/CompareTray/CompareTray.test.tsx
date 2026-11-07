// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CompareTray from ".";
import { TEST_HERO_DATA, TEST_HERO_DATA_2 } from "@/__fixtures__/testData";

const toRosterHero = (data, side) => ({
  id: data.id,
  name: data.name,
  role: "Role",
  aliases: [],
  side,
  images: data.images,
  values: { attack: 3, defense: 2 },
});

const HERO = toRosterHero(TEST_HERO_DATA, "heroes");
const VILLAIN = toRosterHero(TEST_HERO_DATA_2, "villains");

const renderTray = (picked) => {
  const onRemove = vi.fn();
  const onClear = vi.fn();
  renderWithProviders(
    <CompareTray picked={picked} onRemove={onRemove} onClear={onClear} />,
    { withRouter: true }
  );
  return { onRemove, onClear };
};

test("Should show four empty slots and a disabled compare action", () => {
  renderTray([]);

  expect(screen.getByText(/0 of 4 picked/i)).toBeInTheDocument();
  expect(screen.getAllByText(/empty slot/i)).toHaveLength(4);
  expect(screen.queryByRole("link", { name: /compare/i })).toBeNull();
  expect(screen.getByText("Compare")).toHaveAttribute("aria-disabled", "true");
});

test("Should list picked characters and link to compare", () => {
  renderTray([HERO, VILLAIN]);

  expect(screen.getByText(/2 of 4 picked/i)).toBeInTheDocument();
  expect(screen.getAllByText(/empty slot/i)).toHaveLength(2);
  expect(screen.getByText(HERO.name)).toBeInTheDocument();
  expect(screen.getByText(VILLAIN.name)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /compare/i })).toHaveAttribute(
    "href",
    `/herodex/compare?ids=${HERO.id},${VILLAIN.id}`
  );
});

test("Should call remove and clear handlers", () => {
  const { onRemove, onClear } = renderTray([HERO]);

  fireEvent.click(
    screen.getByRole("button", { name: `Remove ${HERO.name} from compare` })
  );
  fireEvent.click(screen.getByRole("button", { name: /clear/i }));

  expect(onRemove).toHaveBeenCalledWith(HERO.id);
  expect(onClear).toHaveBeenCalled();
});
