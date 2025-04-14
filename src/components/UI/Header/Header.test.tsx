// @ts-nocheck
import { renderWithProviders } from "../../../__fixtures__/renderWithProviders";
import { screen, fireEvent } from "@testing-library/react";
import Header from ".";

test("Should render title and back link correctly", () => {
  renderWithProviders(<Header title="test title" />, {
    withRouter: true,
  });

  const title = screen.getByText(/test title/i);
  const backLink = screen.getByRole("link", { name: /back/i });

  expect(title).toBeInTheDocument();
  expect(backLink).toBeInTheDocument();
});
