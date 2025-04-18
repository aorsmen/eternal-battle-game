// @ts-nocheck
import { renderMainContext } from "../../../../__fixtures__/renderMainContext";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import DetailsPanelTabs from ".";
import {
  TEST_HERO_DATA,
  TEST_MAIN_CONTEXT,
} from "../../../../__fixtures__/testData";
import { formatValue } from "./styled.components";

const TEST_MAIN_CTX = {
  value: TEST_MAIN_CONTEXT,
};

test("Should render all tabs correctly", () => {
  renderMainContext(<DetailsPanelTabs data={TEST_HERO_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const tab1 = screen.getByRole("tab", {
    name: /stats & skills/i,
  });
  const tab2 = screen.getByRole("tab", {
    name: /biography/i,
  });
  const tab3 = screen.getByRole("tab", {
    name: /biography/i,
  });

  expect(tab1).toBeInTheDocument();
  expect(tab2).toBeInTheDocument();
  expect(tab3).toBeInTheDocument();
});

test("Should render stats & skills tab content correctly", () => {
  const ssKeys = [
    ...Object.keys(TEST_HERO_DATA.powerstats).map((key) => key.toLowerCase()),
    ...Object.keys(TEST_HERO_DATA.skills).map((key) => key.toLowerCase()),
  ];
  const ssValues = [
    ...Object.values(TEST_HERO_DATA.powerstats),
    ...Object.values(TEST_HERO_DATA.skills),
  ];

  renderMainContext(<DetailsPanelTabs data={TEST_HERO_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const stats = screen.getByText("Stats");
  const skills = screen.getByText("Skills");

  expect(stats).toBeInTheDocument();
  expect(skills).toBeInTheDocument();

  const rows = screen.getAllByRole("row");

  expect(rows).toHaveLength(12);

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");

    expect(cells).toHaveLength(2);

    const key = cells[0].textContent?.replace(/ /g, "").toLowerCase();
    const value = +cells[1].textContent;
    const inx = ssKeys.findIndex((item) => item === key);

    expect(ssKeys[inx]).toBe(key);
    expect(ssValues[inx]).toBe(value);
  });
});

test("Should render biography tab content correctly", () => {
  const rowKeys = Object.keys(TEST_HERO_DATA.biography).map((key) =>
    key.toLowerCase()
  );
  const rowValues = Object.values(TEST_HERO_DATA.biography).map((value) =>
    formatValue(value)
  );

  renderMainContext(<DetailsPanelTabs data={TEST_HERO_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const tab = screen.getByRole("tab", {
    name: /biography/i,
  });

  expect(tab).toBeInTheDocument();

  fireEvent.click(tab);

  const rows = screen.getAllByRole("row");

  expect(rows).toHaveLength(6);

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");

    expect(cells).toHaveLength(2);

    const key = cells[0].textContent?.replace(/ /g, "").toLowerCase();
    const value = cells[1].textContent;
    const inx = rowKeys.findIndex((item) => item === key);

    expect(rowKeys[inx]).toBe(key);
    expect(rowValues[inx]).toBe(value);
  });
});

test("Should render appearence tab content correctly", () => {
  const rowKeys = Object.keys(TEST_HERO_DATA.appearance).map((key) =>
    key.toLowerCase()
  );
  const rowValues = Object.values(TEST_HERO_DATA.appearance).map((value) =>
    formatValue(value)
  );

  renderMainContext(<DetailsPanelTabs data={TEST_HERO_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const tab = screen.getByRole("tab", {
    name: /appearence/i,
  });

  expect(tab).toBeInTheDocument();

  fireEvent.click(tab);

  const rows = screen.getAllByRole("row");

  expect(rows).toHaveLength(6);

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");

    expect(cells).toHaveLength(2);

    const key = cells[0].textContent?.replace(/ /g, "").toLowerCase();
    const value = cells[1].textContent;
    const inx = rowKeys.findIndex((item) => item === key);

    expect(rowKeys[inx]).toBe(key);
    expect(rowValues[inx]).toBe(value);
  });
});
