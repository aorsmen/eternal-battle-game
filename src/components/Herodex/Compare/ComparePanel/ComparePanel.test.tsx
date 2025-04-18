// @ts-nocheck
import { renderMainContext } from "../../../../__fixtures__/renderMainContext";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import ComparePanel from ".";
import {
  TEST_MAIN_CONTEXT,
  TEST_HERO_DATA,
  TEST_HERO_DATA_2,
} from "../../../../__fixtures__/testData";
import { vi } from "vitest";
import { act } from "react";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const TEST_HERO_DATA_LIST = [TEST_HERO_DATA, TEST_HERO_DATA_2];
const TEST_MAIN_CTX = {
  value: TEST_MAIN_CONTEXT,
};

const mockClearHandler = vi.fn();

TEST_MAIN_CONTEXT.getHeroById = (id: string) => {
  return TEST_HERO_DATA_LIST.find((hero) => hero.id === id);
};
TEST_MAIN_CONTEXT.setCompare = mockClearHandler;

test("Should not render the compare panel if compare list is empty", () => {
  renderMainContext(<ComparePanel />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const clearBtn = screen.queryByRole("button", {
    name: /clear/i,
  });
  const compareBtn = screen.queryByRole("button", {
    name: /compare/i,
  });

  expect(clearBtn).not.toBeInTheDocument();
  expect(compareBtn).not.toBeInTheDocument();
});

test("Should render the compare panel if we have item(s) in the list", () => {
  TEST_MAIN_CONTEXT.compareList = [TEST_HERO_DATA.id, TEST_HERO_DATA_2.id];

  renderMainContext(<ComparePanel />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const clearBtn = screen.getByRole("button", {
    name: /clear/i,
  });
  const compareBtn = screen.getByRole("button", {
    name: /compare/i,
  });
  const hero1 = screen.getByRole("img", {
    name: TEST_HERO_DATA.name,
  });
  const hero2 = screen.getByRole("img", {
    name: TEST_HERO_DATA_2.name,
  });

  expect(clearBtn).toBeInTheDocument();
  expect(compareBtn).toBeInTheDocument();
  expect(hero1).toBeInTheDocument();
  expect(hero2).toBeInTheDocument();
});

test("Should clear the list and close the compare panel when click the clear button", () => {
  renderMainContext(<ComparePanel />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const clearBtn = screen.getByRole("button", {
    name: /clear/i,
  });

  expect(clearBtn).toBeInTheDocument();

  fireEvent.click(clearBtn);

  expect(mockClearHandler).toHaveBeenCalled();
  expect(mockClearHandler).toHaveBeenCalledWith("", "clear");

  waitFor(() => {
    const compareBtn = screen.queryByRole("button", {
      name: /compare/i,
    });

    expect(compareBtn).not.toBeInTheDocument();
  });
});

test("Should not render the compare dialog", () => {
  renderMainContext(<ComparePanel />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const compareDialog = screen.queryByTestId("compare-dialog");

  expect(compareDialog).not.toBeInTheDocument();
});

test("Should render the compare dialog when click the compare button", () => {
  renderMainContext(<ComparePanel />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const compareBtn = screen.getByRole("button", {
    name: /compare/i,
  });

  expect(compareBtn).toBeInTheDocument();

  fireEvent.click(compareBtn);

  const compareDialog = screen.queryByTestId("compare-dialog");
  const title = within(compareDialog).getByText(/compare/i);
  const closeBtn = within(compareDialog).getByRole("button", {
    name: /close/i,
  });

  expect(title).toBeInTheDocument();
  expect(closeBtn).toBeInTheDocument();
});

test("Should render the compare data in the compare dialog correctly", () => {
  renderMainContext(<ComparePanel />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const compareBtn = screen.getByRole("button", {
    name: /compare/i,
  });

  expect(compareBtn).toBeInTheDocument();

  fireEvent.click(compareBtn);

  const compareDialog = screen.queryByTestId("compare-dialog");
  const hero1 = within(compareDialog).getByRole("img", {
    name: TEST_HERO_DATA.name,
  });
  const hero2 = within(compareDialog).getByRole("img", {
    name: TEST_HERO_DATA_2.name,
  });
  const stat = within(compareDialog).getByText(/stats/i);
  const skills = within(compareDialog).getByText(/skills/i);

  expect(hero1).toBeInTheDocument();
  expect(hero2).toBeInTheDocument();
  expect(stat).toBeInTheDocument();
  expect(skills).toBeInTheDocument();
});

test("Should close the compare dialog when click the close button", () => {
  renderMainContext(<ComparePanel />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const compareBtn = screen.getByRole("button", {
    name: /compare/i,
  });

  expect(compareBtn).toBeInTheDocument();

  fireEvent.click(compareBtn);

  const compareDialog = screen.queryByTestId("compare-dialog");
  const closeBtn = within(compareDialog).getByRole("button", {
    name: /close/i,
  });

  expect(closeBtn).toBeInTheDocument();

  act(() => {
    fireEvent.click(closeBtn);
  });

  waitFor(() => {
    const compareDialog = screen.queryByTestId("compare-dialog");

    expect(compareDialog).not.toBeInTheDocument();
  });
});
