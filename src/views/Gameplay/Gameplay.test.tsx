// @ts-nocheck
import { renderWithProviders } from "../../__fixtures__/renderWithProviders";
import { screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Gameplay from ".";
import { act } from "react";

test("Should render title and back link in the header", () => {
  renderWithProviders(<Gameplay />, {
    withRouter: true,
  });

  const container = screen.getByRole("banner", {
    hidden: true,
  });
  const title = within(container).getByText(/battle/i);
  const backLink = within(container).getByRole("link", {
    name: /back/i,
    hidden: true,
  });

  expect(title).toBeInTheDocument();
  expect(backLink).toBeInTheDocument();
});

test("Should render the dialog, name input and selections", () => {
  renderWithProviders(<Gameplay />, {
    withRouter: true,
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
  renderWithProviders(<Gameplay />, {
    withRouter: true,
  });

  const heroBtn = screen.getByRole("button", {
    name: /heroes/i,
  });

  expect(heroBtn).toBeInTheDocument();

  fireEvent.click(heroBtn);

  const errorMsg = screen.getByText(/please enter a proper name/i);

  expect(errorMsg).toBeInTheDocument();
});
