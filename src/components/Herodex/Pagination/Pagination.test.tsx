// @ts-nocheck
import { render, screen, fireEvent, within } from "@testing-library/react";
import { vi } from "vitest";
import Pagination from ".";

test("Should render nothing for a single page", () => {
  const { container } = render(
    <Pagination page={1} pageCount={1} onChange={vi.fn()} />
  );

  expect(container).toBeEmptyDOMElement();
});

test("Should mark the current page and disable previous on the first page", () => {
  render(<Pagination page={1} pageCount={3} onChange={vi.fn()} />);

  const nav = screen.getByRole("navigation", { name: /pagination/i });
  expect(within(nav).getByRole("button", { name: "Page 1" })).toHaveAttribute(
    "aria-current",
    "page"
  );
  expect(
    within(nav).getByRole("button", { name: "Page 2" })
  ).not.toHaveAttribute("aria-current");
  expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /next page/i })).toBeEnabled();
  expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
});

test("Should disable next on the last page", () => {
  render(<Pagination page={3} pageCount={3} onChange={vi.fn()} />);

  expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /previous page/i })).toBeEnabled();
});

test("Should call onChange with the chosen page", () => {
  const onChange = vi.fn();
  render(<Pagination page={2} pageCount={3} onChange={onChange} />);

  fireEvent.click(screen.getByRole("button", { name: /next page/i }));
  fireEvent.click(screen.getByRole("button", { name: /previous page/i }));
  fireEvent.click(screen.getByRole("button", { name: "Page 3" }));

  expect(onChange.mock.calls).toEqual([[3], [1], [3]]);
});

test("Should skip distant pages with a gap", () => {
  render(<Pagination page={12} pageCount={23} onChange={vi.fn()} />);

  const pages = screen
    .getAllByRole("button", { name: /^page \d+$/i })
    .map((button) => button.textContent);
  expect(pages).toEqual(["1", "11", "12", "13", "23"]);
  expect(screen.getAllByText("…")).toHaveLength(2);
});
