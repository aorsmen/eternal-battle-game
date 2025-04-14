// @ts-nocheck
import { renderWithProviders } from "../../__fixtures__/renderWithProviders";
import { screen } from "@testing-library/react";
import Credits from ".";
import { CREDITS_CONTENT } from "../../config/pages";

test("Should render credits page header", () => {
  renderWithProviders(<Credits />, {
    withRouter: true,
  });

  const title = screen.getByText(/credits/i);
  const backLink = screen.getByRole("link", { name: /back/i });

  expect(title).toBeInTheDocument();
  expect(backLink).toBeInTheDocument();
});

test("Should render credits page content", () => {
  renderWithProviders(<Credits />, {
    withRouter: true,
  });

  CREDITS_CONTENT.forEach((item) => {
    const title = screen.getByText(item.title);

    expect(title).toBeInTheDocument();

    item.text.forEach((text) => {
      const contentText = screen.getByText(text);

      expect(contentText).toBeInTheDocument();
    });
  });
});
