// @ts-nocheck
import { renderWithProviders } from "../../__fixtures__/renderWithProviders";
import { screen } from "@testing-library/react";
import Home from ".";

test("Should render logo and home menu", () => {
  renderWithProviders(<Home />, {
    withRouter: true,
  });

  const logo = screen.getByAltText(/eternal battle/i);
  const menuItem1 = screen.getByText(/battle/i);
  const menuItem2 = screen.getByText(/herodex/i);
  const menuItem3 = screen.getByText(/credits/i);

  expect(logo).toBeInTheDocument();
  expect(menuItem1).toBeInTheDocument();
  expect(menuItem2).toBeInTheDocument();
  expect(menuItem3).toBeInTheDocument();
});
