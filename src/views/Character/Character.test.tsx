// @ts-nocheck
import { renderHerodex } from "@/__fixtures__/renderHerodex";
import { screen, fireEvent, within } from "@testing-library/react";
import { vi } from "vitest";
import {
  TEST_HERO_DATA,
  TEST_VILLAIN_DATA,
  TEST_HERODEX_DATA,
} from "@/__fixtures__/testData";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(TEST_HERODEX_DATA) })
    )
  );
  window.scrollTo = vi.fn();
});

afterEach(() => vi.unstubAllGlobals());

const renderCharacter = async (hero = TEST_HERO_DATA) => {
  renderHerodex(`/herodex/${hero.id}`);
  await screen.findByRole("heading", { level: 1, name: hero.name });
};

test("Should render the character summary", async () => {
  await renderCharacter();

  expect(
    screen.getByRole("img", { name: TEST_HERO_DATA.name })
  ).toHaveAttribute("src", TEST_HERO_DATA.images.lg);
  expect(screen.getByText("HERO")).toBeInTheDocument();
  expect(
    screen.getByText(`${TEST_HERO_DATA.work.occupation} · Marvel Comics`)
  ).toBeInTheDocument();
  expect(screen.getByTestId("value-attack")).toHaveTextContent("4");
  expect(screen.getByTestId("value-defence")).toHaveTextContent("4");
  expect(screen.getByText(/defence of 4 or less/i)).toBeInTheDocument();
  expect(screen.getByText(/attack below 4/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /herodex/i })).toHaveAttribute(
    "href",
    "/herodex"
  );
});

test("Should show the villain badge for villains", async () => {
  await renderCharacter(TEST_VILLAIN_DATA);

  expect(screen.getByText("VILLAIN")).toBeInTheDocument();
});

test("Should switch between the detail tabs", async () => {
  await renderCharacter();

  const statsTab = screen.getByRole("tab", { name: /stats & skills/i });
  expect(statsTab).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("meter", { name: /intelligence/i })).toHaveAttribute(
    "aria-valuenow",
    "75"
  );

  fireEvent.click(screen.getByRole("tab", { name: /biography/i }));
  expect(screen.getByRole("tabpanel")).toHaveAttribute(
    "aria-labelledby",
    "character-tab-bio"
  );
  expect(
    screen.getByText("Natasha Romanoff", { selector: "span" })
  ).toBeInTheDocument();

  // Arrow keys move to the next tab
  fireEvent.keyDown(screen.getByRole("tab", { name: /biography/i }), {
    key: "ArrowRight",
  });
  expect(screen.getByRole("tab", { name: /appearance/i })).toHaveAttribute(
    "aria-selected",
    "true"
  );
  expect(screen.getByText("Auburn")).toBeInTheDocument();
});

test("Should browse to the previous and next character", async () => {
  await renderCharacter();

  const nav = screen.getByRole("navigation", { name: /browse characters/i });
  expect(within(nav).getByText("1 of 2")).toBeInTheDocument();

  fireEvent.click(within(nav).getByRole("link", { name: /next character/i }));

  expect(
    await screen.findByRole("heading", {
      level: 1,
      name: TEST_VILLAIN_DATA.name,
    })
  ).toBeInTheDocument();
  expect(within(nav).getByText("2 of 2")).toBeInTheDocument();
  expect(
    within(nav).getByRole("link", { name: /previous character/i })
  ).toHaveAttribute("href", `/herodex/${TEST_HERO_DATA.id}`);
});

test("Should toggle compare and show picks in the compare tray", async () => {
  await renderCharacter();

  expect(screen.queryByText(/open compare/i)).not.toBeInTheDocument();

  fireEvent.click(
    screen.getByRole("button", {
      name: `Add to compare: ${TEST_HERO_DATA.name}`,
    })
  );
  expect(
    screen.getByRole("button", { name: `In compare: ${TEST_HERO_DATA.name}` })
  ).toHaveAttribute("aria-pressed", "true");

  fireEvent.click(screen.getByRole("link", { name: /next character/i }));
  await screen.findByRole("heading", {
    level: 1,
    name: TEST_VILLAIN_DATA.name,
  });
  fireEvent.click(
    screen.getByRole("button", {
      name: `Add to compare: ${TEST_VILLAIN_DATA.name}`,
    })
  );

  const tray = screen.getByRole("region", { name: /compare tray/i });
  expect(within(tray).getByText(/2 of 4 picked/i)).toBeInTheDocument();
  expect(within(tray).getByRole("link", { name: /compare/i })).toHaveAttribute(
    "href",
    `/herodex/compare?ids=${TEST_HERO_DATA.id},${TEST_VILLAIN_DATA.id}`
  );
});

test("Should show not found for an unknown character", async () => {
  renderHerodex("/herodex/does-not-exist");

  expect(
    await screen.findByRole("heading", { name: /character not found/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /back to all characters/i })
  ).toHaveAttribute("href", "/herodex");
});
