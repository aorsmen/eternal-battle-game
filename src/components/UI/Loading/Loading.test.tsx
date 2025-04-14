// @ts-nocheck
import { renderWithProviders } from "../../../__fixtures__/renderWithProviders";
import { screen, fireEvent } from "@testing-library/react";
import Loading from ".";

test("Should render circular progress correctly", () => {
  renderWithProviders(<Loading />, {
    withRouter: false,
  });

  const progress = screen.getByRole("progressbar");

  expect(progress).toBeInTheDocument();
});
