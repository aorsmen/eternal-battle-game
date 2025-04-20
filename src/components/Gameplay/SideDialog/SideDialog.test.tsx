// @ts-nocheck
import { renderGameContext } from "../../../__fixtures__/renderGameContext";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SideDialog from ".";
import { TEST_GAME_CONTEXT } from "../../../__fixtures__/testData";
import { vi } from "vitest";
import { act } from "react";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

const mockSideSelectionHandler = vi.fn();

TEST_GAME_CONTEXT.setSideSelection = mockSideSelectionHandler;

test("Should not render the dialog", () => {
  renderGameContext(<SideDialog />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const title = screen.queryByText(/player info/i);

  expect(title).not.toBeInTheDocument();
});

test("Should render the dialog, name input and selections", () => {
  TEST_GAME_CONTEXT.sides.player.type = null;

  renderGameContext(<SideDialog />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const title = screen.getByText(/player info/i);
  const hero = screen.getByRole("img", { name: /heroes/i });
  const villain = screen.getByRole("img", { name: /villains/i });
  const input = screen.getByRole("textbox", {
    name: /player name/i,
  });

  expect(title).toBeInTheDocument();
  expect(hero).toBeInTheDocument();
  expect(villain).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});

test("Should show the error message if name field is empty", () => {
  renderGameContext(<SideDialog />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const heroBtn = screen.getByRole("button", {
    name: /heroes/i,
  });

  expect(heroBtn).toBeInTheDocument();

  fireEvent.click(heroBtn);

  const errorMsg = screen.getByText(/please enter a proper name/i);

  expect(errorMsg).toBeInTheDocument();
});

test("Should call the function and close the dialog when select a side", async () => {
  renderGameContext(<SideDialog />, {
    providerProps: TEST_GAME_CTX,
    withRouter: false,
  });

  const input = screen.getByRole("textbox", {
    name: /player name/i,
  });

  expect(input).toBeInTheDocument();

  await userEvent.type(input, "test user");

  expect(input).toHaveValue("test user");

  const heroBtn = screen.getByRole("button", {
    name: /heroes/i,
  });

  expect(heroBtn).toBeInTheDocument();

  act(() => {
    fireEvent.click(heroBtn);
  });

  expect(mockSideSelectionHandler).toHaveBeenCalled(1);

  waitFor(() => {
    const title = screen.queryByText(/player info/i);

    expect(title).not.toBeInTheDocument();
  });
});
