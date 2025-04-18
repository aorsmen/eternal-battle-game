// @ts-nocheck
import { renderWithProviders } from "../../../__fixtures__/renderWithProviders";
import { screen, fireEvent } from "@testing-library/react";
import Header from ".";
import { Typography } from "@mui/material";

test("Should render title and back link correctly", () => {
  renderWithProviders(<Header title="test title" />, {
    withRouter: true,
  });

  const title = screen.getByText(/test title/i);
  const backLink = screen.getByRole("link", { name: /back/i });

  expect(title).toBeInTheDocument();
  expect(backLink).toBeInTheDocument();
});

test("Should render the children if provided", () => {
  renderWithProviders(
    <Header title="test title">
      <Typography data-testid="test-children">Test Children</Typography>
    </Header>,
    {
      withRouter: true,
    }
  );

  const children = screen.getByTestId("test-children");

  expect(children).toBeInTheDocument();
});
