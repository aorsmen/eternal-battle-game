// @ts-nocheck
import { screen, fireEvent, render } from "@testing-library/react";
import Loading from ".";

test("Should render circular progress correctly", () => {
  render(<Loading />);

  const progress = screen.getByRole("progressbar");

  expect(progress).toBeInTheDocument();
});
