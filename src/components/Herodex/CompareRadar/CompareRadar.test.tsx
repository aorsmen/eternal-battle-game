// @ts-nocheck
import { render, screen } from "@testing-library/react";
import CompareRadar from ".";

const LABELS = ["A", "B", "C", "D", "E", "F"];

test("Should draw one shape per shown character with the axis labels", () => {
  render(
    <CompareRadar
      title="Radar chart of Stats"
      labels={LABELS}
      series={[
        {
          id: "1",
          name: "One",
          color: "#F5B83D",
          values: [100, 0, 0, 0, 0, 0],
        },
        {
          id: "2",
          name: "Two",
          color: "#4FD1C5",
          values: [50, 50, 50, 50, 50, 50],
        },
      ]}
    />
  );

  expect(
    screen.getByRole("img", { name: "Radar chart of Stats" })
  ).toBeInTheDocument();
  LABELS.forEach((label) =>
    expect(screen.getByText(label)).toBeInTheDocument()
  );
  // 100 on the first axis reaches the top of the outer ring (y = 215 - 150)
  expect(screen.getByTestId("radar-series-1").getAttribute("points")).toMatch(
    /^230\.0,65\.0 /
  );
  expect(screen.getByTestId("radar-series-2")).toHaveAttribute(
    "stroke",
    "#4FD1C5"
  );
});

test("Should keep values above 100 on the outer ring", () => {
  render(
    <CompareRadar
      title="Chart"
      labels={LABELS}
      series={[
        { id: "1", name: "One", color: "#fff", values: [180, 0, 0, 0, 0, 0] },
      ]}
    />
  );

  expect(screen.getByTestId("radar-series-1").getAttribute("points")).toMatch(
    /^230\.0,65\.0 /
  );
});
