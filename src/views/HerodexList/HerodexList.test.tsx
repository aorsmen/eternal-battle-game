// @ts-nocheck
import { renderHerodex as renderRoutes } from "@/__fixtures__/renderHerodex";
import { screen, fireEvent, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {
  TEST_HERO_DATA,
  TEST_VILLAIN_DATA as VILLAIN,
  TEST_NEUTRAL_DATA as NEUTRAL,
  TEST_HERODEX_DATA,
} from "@/__fixtures__/testData";

const stubHeroData = (data) =>
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      })
    )
  );

// 30 heroes: one full page of 24 and a second page of 6
const MANY_HEROES = Array.from({ length: 30 }, (_, i) => {
  const number = String(i + 1).padStart(2, "0");
  return {
    ...TEST_HERO_DATA,
    id: `${1000 + i}`,
    name: `Hero ${number}`,
    biography: { ...TEST_HERO_DATA.biography, aliases: ["-"] },
  };
});

beforeEach(() => {
  stubHeroData(TEST_HERODEX_DATA);
  window.scrollTo = vi.fn();
});

afterEach(() => vi.unstubAllGlobals());

const renderHerodex = async () => {
  renderRoutes("/herodex");
  await screen.findByText(TEST_HERO_DATA.name);
};

const cardNames = () =>
  within(screen.getByRole("region", { name: /^characters$/i }))
    .getAllByRole("article")
    .map((card) => within(card).getByRole("link").getAttribute("aria-label"));

test("Should render the title, home link and filters", async () => {
  await renderHerodex();

  expect(screen.getByRole("heading", { name: /herodex/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
    "href",
    "/"
  );
  expect(
    screen.getByRole("searchbox", { name: /search characters/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("radio", { name: /^all\s*2$/i })).toHaveAttribute(
    "aria-checked",
    "true"
  );
  expect(
    screen.getByRole("radio", { name: /^heroes\s*1$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("radio", { name: /^villains\s*1$/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: /sort by/i })).toHaveValue(
    "name"
  );
});

test("Should list heroes and villains only, linked to their details", async () => {
  await renderHerodex();

  expect(screen.getByText(/showing 2 characters/i)).toBeInTheDocument();
  expect(screen.queryByText(NEUTRAL.name)).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: `${TEST_HERO_DATA.name}, open details` })
  ).toHaveAttribute("href", `/herodex/${TEST_HERO_DATA.id}`);
});

test("Should filter by side", async () => {
  await renderHerodex();

  fireEvent.click(screen.getByRole("radio", { name: /villains/i }));

  expect(cardNames()).toEqual([`${VILLAIN.name}, open details`]);
  expect(screen.getByText(/showing 1 characters/i)).toBeInTheDocument();
});

test("Should filter by search and show the empty state", async () => {
  await renderHerodex();

  const search = screen.getByRole("searchbox", { name: /search characters/i });

  await userEvent.type(search, "villain");
  // Debounced: the list only updates once typing pauses
  expect(cardNames()).toHaveLength(2);
  await waitFor(() =>
    expect(cardNames()).toEqual([`${VILLAIN.name}, open details`])
  );

  await userEvent.clear(search);
  await userEvent.type(search, "nobody here");
  expect(await screen.findByText(/no characters found/i)).toBeInTheDocument();
});

test("Should find characters by alias", async () => {
  await renderHerodex();

  await userEvent.type(
    screen.getByRole("searchbox", { name: /search characters/i }),
    "yelena"
  );

  await waitFor(() =>
    expect(cardNames()).toEqual([`${TEST_HERO_DATA.name}, open details`])
  );
});

test("Should sort by name by default and change the order", async () => {
  await renderHerodex();

  const byName = cardNames();
  expect(byName).toEqual([...byName].sort());

  fireEvent.change(screen.getByRole("combobox", { name: /sort by/i }), {
    target: { value: "nameDesc" },
  });
  expect(cardNames()).toEqual([...byName].reverse());

  fireEvent.change(screen.getByRole("combobox", { name: /sort by/i }), {
    target: { value: "defense" },
  });

  expect(screen.getByRole("combobox", { name: /sort by/i })).toHaveValue(
    "defense"
  );
});

test("Should show the compare tray only while characters are picked", async () => {
  await renderHerodex();

  expect(
    screen.queryByRole("region", { name: /compare tray/i })
  ).not.toBeInTheDocument();

  fireEvent.click(
    screen.getByRole("button", { name: `Compare: ${TEST_HERO_DATA.name}` })
  );

  const tray = screen.getByRole("region", { name: /compare tray/i });
  expect(within(tray).getByText(/1 of 4 picked/i)).toBeInTheDocument();
  expect(within(tray).queryByRole("link", { name: /compare/i })).toBeNull();

  fireEvent.click(
    screen.getByRole("button", { name: `Compare: ${VILLAIN.name}` })
  );

  expect(within(tray).getByText(/2 of 4 picked/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: `In compare: ${VILLAIN.name}` })
  ).toHaveAttribute("aria-pressed", "true");
  expect(within(tray).getByRole("link", { name: /compare/i })).toHaveAttribute(
    "href",
    `/herodex/compare?ids=${TEST_HERO_DATA.id},${VILLAIN.id}`
  );

  fireEvent.click(
    within(tray).getByRole("button", {
      name: `Remove ${VILLAIN.name} from compare`,
    })
  );
  expect(within(tray).getByText(/1 of 4 picked/i)).toBeInTheDocument();

  fireEvent.click(within(tray).getByRole("button", { name: /clear/i }));
  expect(
    screen.queryByRole("region", { name: /compare tray/i })
  ).not.toBeInTheDocument();
});

test("Should not show pagination when everything fits on one page", async () => {
  await renderHerodex();

  expect(
    screen.queryByRole("navigation", { name: /pagination/i })
  ).not.toBeInTheDocument();
});

test("Should split the roster into pages of 24", async () => {
  stubHeroData(MANY_HEROES);
  renderRoutes("/herodex");
  await screen.findByText("Hero 01");

  expect(cardNames()).toHaveLength(24);
  expect(screen.getByText("Showing 1–24 of 30 characters")).toBeInTheDocument();

  const nav = screen.getByRole("navigation", { name: /pagination/i });
  fireEvent.click(within(nav).getByRole("button", { name: /next page/i }));

  expect(cardNames()).toEqual(
    ["25", "26", "27", "28", "29", "30"].map(
      (number) => `Hero ${number}, open details`
    )
  );
  expect(
    screen.getByText("Showing 25–30 of 30 characters")
  ).toBeInTheDocument();
  expect(within(nav).getByRole("button", { name: "Page 2" })).toHaveAttribute(
    "aria-current",
    "page"
  );
  expect(
    within(nav).getByRole("button", { name: /next page/i })
  ).toBeDisabled();
  expect(window.scrollTo).toHaveBeenCalled();
});

test("Should go back to page 1 when the filters change", async () => {
  stubHeroData(MANY_HEROES);
  renderRoutes("/herodex");
  await screen.findByText("Hero 01");

  fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
  expect(screen.getByText("Hero 30")).toBeInTheDocument();

  fireEvent.change(screen.getByRole("combobox", { name: /sort by/i }), {
    target: { value: "nameDesc" },
  });

  expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute(
    "aria-current",
    "page"
  );
  expect(cardNames()[0]).toBe("Hero 30, open details");
});

test("Should keep the page after opening a character and coming back", async () => {
  stubHeroData(MANY_HEROES);
  renderRoutes("/herodex");
  await screen.findByText("Hero 01");

  fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
  fireEvent.click(screen.getByRole("link", { name: "Hero 27, open details" }));
  await screen.findByRole("heading", { level: 1, name: "Hero 27" });

  fireEvent.click(screen.getByRole("link", { name: /herodex/i }));
  await screen.findByText("Hero 30");

  expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
    "aria-current",
    "page"
  );
});
