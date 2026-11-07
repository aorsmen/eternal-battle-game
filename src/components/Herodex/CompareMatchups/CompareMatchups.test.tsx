// @ts-nocheck
import { render, screen, within } from "@testing-library/react";
import CompareMatchups from ".";

const CARDS = [
  {
    id: "1",
    name: "Strong",
    color: "#F5B83D",
    values: { attack: 5, defense: 6 },
  },
  {
    id: "2",
    name: "Weak",
    color: "#4FD1C5",
    values: { attack: 2, defense: 3 },
  },
  {
    id: "3",
    name: "Even",
    color: "#B794F6",
    values: { attack: 5, defense: 6 },
  },
];

const resultsFor = (name) =>
  within(screen.getByRole("row", { name: new RegExp(`^${name}`, "i") }))
    .getAllByRole("cell")
    .map((cell) => cell.textContent);

test("Should show each card's result against every opponent", () => {
  render(<CompareMatchups cards={CARDS} />);

  expect(
    screen.getByRole("columnheader", { name: "vs Weak" })
  ).toBeInTheDocument();
  expect(resultsFor("Strong")).toEqual(["—Same card", "Wins", "Draw"]);
  expect(resultsFor("Weak")).toEqual(["Loses", "—Same card", "Loses"]);
  expect(resultsFor("Even")).toEqual(["Draw", "Wins", "—Same card"]);
});
