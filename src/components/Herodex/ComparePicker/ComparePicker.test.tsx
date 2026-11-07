// @ts-nocheck
import { render, screen, fireEvent, within } from "@testing-library/react";
import { vi } from "vitest";
import ComparePicker from ".";

const hero = (id, name, side, role = "Fighter", aliases = []) => ({
  id,
  name,
  role,
  aliases,
  side,
  images: { xs: `${id}.jpg` },
  values: { attack: 3, defense: 4 },
});

const ROSTER = [
  hero("1", "Zeta", "heroes", "Pilot"),
  hero("2", "Alpha", "villains", "Thief", ["Shadow"]),
  hero("3", "Beta", "heroes"),
];

const renderPicker = (props = {}) => {
  const onAdd = vi.fn();
  const onClose = vi.fn();
  render(
    <ComparePicker
      roster={ROSTER}
      compareIds={["3"]}
      onAdd={onAdd}
      onClose={onClose}
      {...props}
    />
  );
  return { onAdd, onClose };
};

const rowNames = () =>
  within(screen.getByRole("list", { name: /characters/i }))
    .getAllByRole("listitem")
    .map((row) => row.querySelector("div > span")?.textContent);

test("Should open as a dialog with the free slots and a focused search", () => {
  renderPicker();

  expect(
    screen.getByRole("dialog", { name: /add a character/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/3 of 4 slots free/i)).toBeInTheDocument();
  expect(
    screen.getByRole("searchbox", { name: /search characters/i })
  ).toHaveFocus();
});

test("Should list everyone A–Z and mark characters already picked", () => {
  renderPicker();

  expect(rowNames()).toEqual(["Alpha", "Beta", "Zeta"]);
  expect(
    screen.getByRole("button", { name: "Beta is already in compare" })
  ).toBeDisabled();
});

test("Should filter by search (including aliases) and side", () => {
  renderPicker();

  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "shadow" },
  });
  expect(rowNames()).toEqual(["Alpha"]);

  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "" } });
  fireEvent.click(screen.getByRole("radio", { name: "Heroes" }));
  expect(rowNames()).toEqual(["Beta", "Zeta"]);

  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "nobody" },
  });
  expect(screen.getByText(/no characters match/i)).toBeInTheDocument();
});

test("Should add the character and close", () => {
  const { onAdd, onClose } = renderPicker();

  fireEvent.click(screen.getByRole("button", { name: "Add Zeta to compare" }));

  expect(onAdd).toHaveBeenCalledWith("1");
  expect(onClose).toHaveBeenCalled();
});

test("Should close with the close button and Escape", () => {
  const { onClose } = renderPicker();

  fireEvent.click(screen.getByRole("button", { name: "Close" }));
  fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

  expect(onClose).toHaveBeenCalledTimes(2);
});
