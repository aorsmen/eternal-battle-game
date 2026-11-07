// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen } from "@testing-library/react";
import Home from ".";

test("Should render title and home menu", () => {
  renderWithProviders(<Home />, {
    withRouter: true,
  });

  const title = screen.getByRole("heading", { name: /eternal\s*battle/i });
  const menu = screen.getByRole("navigation", { name: /main menu/i });
  const battle = screen.getByRole("link", { name: /battle/i });
  const herodex = screen.getByRole("link", { name: /herodex/i });
  const credits = screen.getByRole("link", { name: /credits/i });

  expect(title).toBeInTheDocument();
  expect(menu).toBeInTheDocument();
  expect(battle).toHaveAttribute("href", "/battle");
  expect(herodex).toHaveAttribute("href", "/herodex");
  expect(credits).toHaveAttribute("href", "/credits");
});
