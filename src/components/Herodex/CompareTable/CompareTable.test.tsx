// @ts-nocheck
import { render, screen, within } from "@testing-library/react";
import CompareTable from ".";

const LABELS = ["Strength", "Speed"];
const COLUMNS = [
  { id: "1", name: "One", color: "#F5B83D", values: [80, 40] },
  { id: "2", name: "Two", color: "#4FD1C5", values: [60, 40] },
];

test("Should list each value per character with a total row", () => {
  render(<CompareTable labels={LABELS} columns={COLUMNS} />);

  expect(screen.getByRole("columnheader", { name: "One" })).toBeInTheDocument();
  expect(screen.getByRole("columnheader", { name: "Two" })).toBeInTheDocument();

  const total = screen.getByRole("row", { name: /total/i });
  expect(
    within(total)
      .getAllByRole("cell")
      .map((c) => c.textContent)
  ).toEqual(["120 (highest)", "100"]);
});

test("Should mark the highest value in each row, including ties", () => {
  render(<CompareTable labels={LABELS} columns={COLUMNS} />);

  const strength = within(screen.getByRole("row", { name: /strength/i }));
  expect(strength.getAllByRole("cell")[0]).toHaveAttribute("data-best", "true");
  expect(strength.getAllByRole("cell")[1]).not.toHaveAttribute("data-best");

  const speed = within(screen.getByRole("row", { name: /speed/i }));
  speed
    .getAllByRole("cell")
    .forEach((cell) => expect(cell).toHaveAttribute("data-best", "true"));
});

test("Should not mark anything with a single character", () => {
  render(<CompareTable labels={LABELS} columns={[COLUMNS[0]]} />);

  expect(screen.queryByText(/highest/)).not.toBeInTheDocument();
});

test("Should explain when every character is hidden", () => {
  render(<CompareTable labels={LABELS} columns={[]} />);

  expect(screen.getByText(/every character is hidden/i)).toBeInTheDocument();
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
});
