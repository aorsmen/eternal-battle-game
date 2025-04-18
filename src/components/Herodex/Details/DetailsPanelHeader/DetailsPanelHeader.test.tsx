// @ts-nocheck
import { renderMainContext } from "../../../../__fixtures__/renderMainContext";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import DetailsPanelHeader from ".";
import { TEST_MAIN_CONTEXT } from "../../../../__fixtures__/testData";
import { vi } from "vitest";
import { act } from "react";

const TEST_MAIN_CTX = {
  value: TEST_MAIN_CONTEXT,
};

const mockSetNodeDetailsHandler = vi.fn();

TEST_MAIN_CONTEXT.setNodeDetails = mockSetNodeDetailsHandler;

test("Should render title and close button", () => {
  renderMainContext(<DetailsPanelHeader title="test title" />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const title = screen.getByText(/test title/i);
  const closeBtn = screen.getByRole("button", {
    name: /close/i,
  });

  expect(title).toBeInTheDocument();
  expect(closeBtn).toBeInTheDocument();
});

test("Should call the correct function when click the close button", () => {
  renderMainContext(<DetailsPanelHeader title="test title" />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const closeBtn = screen.getByRole("button", {
    name: /close/i,
  });

  expect(closeBtn).toBeInTheDocument();

  fireEvent.click(closeBtn);

  expect(mockSetNodeDetailsHandler).toHaveBeenCalled();
  expect(mockSetNodeDetailsHandler).toHaveBeenCalledWith("");
});
