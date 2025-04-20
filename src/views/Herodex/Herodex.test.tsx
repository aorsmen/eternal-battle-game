// @ts-nocheck
import { renderWithProviders } from "../../__fixtures__/renderWithProviders";
import { screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Herodex from ".";
import { act } from "react";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test("Should render title and back link in the header", () => {
  renderWithProviders(<Herodex />, {
    withRouter: true,
  });

  const container = screen.getByRole("banner");
  const title = within(container).getByText(/herodex/i);
  const backLink = within(container).getByRole("link", {
    name: /back/i,
  });

  expect(title).toBeInTheDocument();
  expect(backLink).toBeInTheDocument();
});

test("Should render combobox and buttons in the nodeIndex", () => {
  renderWithProviders(<Herodex />, {
    withRouter: true,
  });

  const combobox = screen.getByRole("combobox", {
    name: /select a hero/i,
  });
  const openBtn = screen.getByRole("button", {
    name: /open/i,
  });
  const addBtn = screen.getByRole("button", {
    name: /add/i,
  });

  expect(combobox).toBeInTheDocument();
  expect(openBtn).toBeInTheDocument();
  expect(addBtn).toBeInTheDocument();
});

test("Should render the board", () => {
  renderWithProviders(<Herodex />, {
    withRouter: true,
  });

  const board = screen.getByTestId("rf__wrapper");
  const reactFlow = screen.getByText(/react flow/i);

  expect(board).toBeInTheDocument();
  expect(reactFlow).toBeInTheDocument();
});
