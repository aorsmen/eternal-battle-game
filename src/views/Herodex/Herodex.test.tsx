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

const tray = () => screen.queryByRole("region", { name: /compare tray/i });

test("Should keep compare picks and the tray when opening a character", async () => {
  renderHerodex("/herodex");
  await screen.findByText(TEST_HERO_DATA.name);

  fireEvent.click(
    screen.getByRole("button", { name: `Compare: ${TEST_HERO_DATA.name}` })
  );
  fireEvent.click(
    screen.getByRole("link", {
      name: `${TEST_VILLAIN_DATA.name}, open details`,
    })
  );

  expect(
    await screen.findByRole("heading", {
      level: 1,
      name: TEST_VILLAIN_DATA.name,
    })
  ).toBeInTheDocument();
  expect(within(tray()).getByText(/1 of 4 picked/i)).toBeInTheDocument();
  expect(within(tray()).getByText(TEST_HERO_DATA.name)).toBeInTheDocument();

  // Adding from the detail page updates the same tray
  fireEvent.click(
    screen.getByRole("button", {
      name: `Add to compare: ${TEST_VILLAIN_DATA.name}`,
    })
  );
  expect(within(tray()).getByText(/2 of 4 picked/i)).toBeInTheDocument();

  // ...and the picks are still there back on the roster
  fireEvent.click(screen.getByRole("link", { name: /herodex/i }));
  expect(
    await screen.findByRole("heading", { level: 1, name: /herodex/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: `In compare: ${TEST_VILLAIN_DATA.name}`,
    })
  ).toHaveAttribute("aria-pressed", "true");
  expect(within(tray()).getByText(/2 of 4 picked/i)).toBeInTheDocument();
});

test("Should hide the tray on the character page until something is picked", async () => {
  renderHerodex(`/herodex/${TEST_HERO_DATA.id}`);
  await screen.findByRole("heading", { level: 1, name: TEST_HERO_DATA.name });

  expect(tray()).not.toBeInTheDocument();

  fireEvent.click(
    screen.getByRole("button", {
      name: `Add to compare: ${TEST_HERO_DATA.name}`,
    })
  );
  expect(tray()).toBeInTheDocument();

  fireEvent.click(within(tray()).getByRole("button", { name: /clear/i }));
  expect(tray()).not.toBeInTheDocument();
});

test("Should keep the roster filters when coming back from a character", async () => {
  renderHerodex("/herodex");
  await screen.findByText(TEST_HERO_DATA.name);

  fireEvent.click(screen.getByRole("radio", { name: /villains/i }));
  fireEvent.click(
    screen.getByRole("link", {
      name: `${TEST_VILLAIN_DATA.name}, open details`,
    })
  );
  await screen.findByRole("heading", {
    level: 1,
    name: TEST_VILLAIN_DATA.name,
  });
  fireEvent.click(screen.getByRole("link", { name: /herodex/i }));

  expect(
    await screen.findByRole("radio", { name: /villains/i })
  ).toHaveAttribute("aria-checked", "true");
});
