// @ts-nocheck
import { render, screen } from "@testing-library/react";
import SideIcon from ".";

test.each(["heroes", "villains"])("Should render the %s icon", (side) => {
  render(<SideIcon side={side} size={24} color="red" />);

  const icon = screen.getByTestId(`side-icon-${side}`);
  expect(icon).toHaveAttribute("width", "24");
  expect(icon).toHaveAttribute("stroke", "red");
  expect(icon).toHaveAttribute("aria-hidden", "true");
});
