// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen } from "@testing-library/react";
import TopBar from ".";

test("Should render the home link and the logo text", () => {
  renderWithProviders(<TopBar />, { withRouter: true });

  expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
    "href",
    "/"
  );
  expect(screen.getByText("ETERNAL")).toBeInTheDocument();
  expect(screen.getByText("BATTLE")).toBeInTheDocument();
});
