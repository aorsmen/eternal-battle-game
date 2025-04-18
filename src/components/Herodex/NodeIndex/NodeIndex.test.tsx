// @ts-nocheck
import { renderMainContext } from "../../../__fixtures__/renderMainContext";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NodeIndex from ".";
import {
  TEST_HERO_DATA,
  TEST_MAIN_CONTEXT,
} from "../../../__fixtures__/testData";
import { vi } from "vitest";
import { act } from "react";

const TEST_MAIN_CTX = {
  value: TEST_MAIN_CONTEXT,
};

const mockAddHeroHandler = vi.fn();

TEST_MAIN_CONTEXT.addHero = mockAddHeroHandler;

test("Should render combobox and buttons correctly", () => {
  renderMainContext(<NodeIndex />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
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

test("Should suggest hero when type to the combobox and change value when select one of the suggestions", async () => {
  renderMainContext(<NodeIndex />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const combobox = screen.getByRole("combobox", {
    name: /select a hero/i,
  });

  expect(combobox).toBeInTheDocument();

  await userEvent.type(combobox, "black");

  expect(combobox).toHaveValue("black");

  const hero = screen.getByRole("option", {
    name: /black widow/i,
  });

  expect(hero).toBeInTheDocument();

  act(() => {
    fireEvent.click(hero);
  });

  expect(combobox).toHaveValue("Black Widow");
});

test("Add button must be disabled initial state and must be enabled one of the suggestions selected", async () => {
  renderMainContext(<NodeIndex />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const combobox = screen.getByRole("combobox", {
    name: /select a hero/i,
  });
  const addBtn = screen.getByRole("button", {
    name: /add/i,
  });

  expect(combobox).toBeInTheDocument();
  expect(addBtn).toBeInTheDocument();
  expect(addBtn).toBeDisabled();

  await userEvent.type(combobox, "black");

  expect(combobox).toHaveValue("black");

  const hero = screen.getByRole("option", {
    name: /black widow/i,
  });

  expect(hero).toBeInTheDocument();

  act(() => {
    fireEvent.click(hero);
  });

  expect(combobox).toHaveValue("Black Widow");
  expect(addBtn).not.toBeDisabled();
});

test("Should call add hero function and send correct id when click the add button", async () => {
  renderMainContext(<NodeIndex />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const combobox = screen.getByRole("combobox", {
    name: /select a hero/i,
  });
  const addBtn = screen.getByRole("button", {
    name: /add/i,
  });

  expect(combobox).toBeInTheDocument();
  expect(addBtn).toBeInTheDocument();
  expect(addBtn).toBeDisabled();

  await userEvent.type(combobox, "black");

  expect(combobox).toHaveValue("black");

  const hero = screen.getByRole("option", {
    name: /black widow/i,
  });

  expect(hero).toBeInTheDocument();

  act(() => {
    fireEvent.click(hero);
  });

  expect(combobox).toHaveValue("Black Widow");
  expect(addBtn).not.toBeDisabled();

  act(() => {
    fireEvent.click(addBtn);
  });

  expect(mockAddHeroHandler).toHaveBeenCalled();
  expect(mockAddHeroHandler).toHaveBeenCalledWith(TEST_HERO_DATA.id);
});

test("Should show clear button when select one of the suggestions and clear the input value when click the clear button", async () => {
  renderMainContext(<NodeIndex />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const combobox = screen.getByRole("combobox", {
    name: /select a hero/i,
  });

  expect(combobox).toBeInTheDocument();

  await userEvent.type(combobox, "black");

  expect(combobox).toHaveValue("black");

  const hero = screen.getByRole("option", {
    name: /black widow/i,
  });

  expect(hero).toBeInTheDocument();

  act(() => {
    fireEvent.click(hero);
  });

  expect(combobox).toHaveValue("Black Widow");

  waitFor(() => {
    const clearBtn = screen.getByRole("button", {
      name: /clear/i,
    });

    expect(clearBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(hero);
    });

    expect(combobox).toHaveValue("");
  });
});
