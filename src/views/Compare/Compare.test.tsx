// @ts-nocheck
import { renderHerodex } from "@/__fixtures__/renderHerodex";
import { screen, fireEvent, within } from "@testing-library/react";
import { vi } from "vitest";
import {
  TEST_HERO_DATA as HERO,
  TEST_VILLAIN_DATA as VILLAIN,
  TEST_HERODEX_DATA,
} from "@/__fixtures__/testData";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(TEST_HERODEX_DATA),
      })
    )
  );
  window.scrollTo = vi.fn();
});

afterEach(() => vi.unstubAllGlobals());

const renderCompare = async (ids = `${HERO.id},${VILLAIN.id}`) => {
  renderHerodex(`/herodex/compare?ids=${ids}`);
  await screen.findByRole("heading", { level: 1, name: /compare/i });
};

const people = () =>
  within(
    screen.getByRole("region", { name: /characters in this comparison/i })
  ).queryAllByRole("article");

const tableColumns = () =>
  screen
    .getAllByRole("table")[0]
    .querySelectorAll("thead th")
    .values()
    .map((th) => th.textContent)
    .toArray();

test("Should open a compare link with its characters and no compare tray", async () => {
  await renderCompare();

  expect(people().map((card) => card.getAttribute("aria-label"))).toEqual([
    HERO.name,
    VILLAIN.name,
  ]);
  expect(screen.getByRole("link", { name: HERO.name })).toHaveAttribute(
    "href",
    `/herodex/${HERO.id}`
  );
  expect(screen.getByRole("link", { name: /herodex/i })).toHaveAttribute(
    "href",
    "/herodex"
  );
  expect(
    screen.getByRole("img", { name: /radar chart of stats/i })
  ).toBeInTheDocument();
  expect(tableColumns()).toEqual([HERO.name, VILLAIN.name]);
  expect(
    screen.getByRole("region", { name: /card matchups/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/2 of 4 slots free/i)).toBeInTheDocument();
  expect(
    screen.queryByRole("region", { name: /compare tray/i })
  ).not.toBeInTheDocument();
});

test("Should switch the chart and table between stats and skills", async () => {
  await renderCompare();

  expect(
    screen.getByRole("heading", { name: /head to head · stats/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("rowheader", { name: "Intelligence" })).toBeVisible();

  fireEvent.click(screen.getByRole("radio", { name: "Skills" }));

  expect(screen.getByRole("radio", { name: "Skills" })).toHaveAttribute(
    "aria-checked",
    "true"
  );
  expect(
    screen.getByRole("heading", { name: /head to head · skills/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("rowheader", { name: "Attack Power" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: /radar chart of skills/i })
  ).toBeInTheDocument();
});

test("Should hide a character from the chart and table but keep the card", async () => {
  await renderCompare();

  const hide = screen.getByRole("button", {
    name: `Hide ${VILLAIN.name} on chart`,
  });
  expect(hide).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(hide);

  expect(
    screen.getByRole("button", { name: `Show ${VILLAIN.name} on chart` })
  ).toHaveAttribute("aria-pressed", "false");
  expect(tableColumns()).toEqual([HERO.name]);
  expect(screen.queryByTestId(`radar-series-${VILLAIN.id}`)).toBeNull();
  expect(people()).toHaveLength(2);
});

test("Should remove a character and free its slot", async () => {
  await renderCompare();

  fireEvent.click(
    screen.getByRole("button", { name: `Remove ${VILLAIN.name}` })
  );

  expect(people()).toHaveLength(1);
  expect(screen.getByText(/3 of 4 slots free/i)).toBeInTheDocument();
  expect(
    screen.getByText(/add another character to see who wins/i)
  ).toBeInTheDocument();
});

test("Should add a character from the picker", async () => {
  await renderCompare(HERO.id);

  fireEvent.click(screen.getByRole("button", { name: /add character/i }));
  const dialog = screen.getByRole("dialog", { name: /add a character/i });
  expect(
    within(dialog).getByRole("button", {
      name: `${HERO.name} is already in compare`,
    })
  ).toBeDisabled();

  fireEvent.click(
    within(dialog).getByRole("button", {
      name: `Add ${VILLAIN.name} to compare`,
    })
  );

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(people()).toHaveLength(2);
  expect(
    screen.getByRole("columnheader", { name: `vs ${VILLAIN.name}` })
  ).toBeInTheDocument();
});

test("Should drop unknown ids and show the empty state", async () => {
  await renderCompare("nope,998");

  expect(
    await screen.findByText(/nothing to compare yet/i)
  ).toBeInTheDocument();
  expect(people()).toHaveLength(0);
  expect(screen.getByText(/4 of 4 slots free/i)).toBeInTheDocument();
});

test("Should reach the compare page from the tray with the picks", async () => {
  renderHerodex("/herodex");
  await screen.findByText(HERO.name);

  fireEvent.click(
    screen.getByRole("button", { name: `Compare: ${HERO.name}` })
  );
  fireEvent.click(
    screen.getByRole("button", { name: `Compare: ${VILLAIN.name}` })
  );
  fireEvent.click(
    within(screen.getByRole("region", { name: /compare tray/i })).getByRole(
      "link",
      { name: /compare/i }
    )
  );

  await screen.findByRole("heading", { level: 1, name: /compare/i });
  expect(people()).toHaveLength(2);
});
