// @ts-nocheck
import { renderMainContext } from "../../../__fixtures__/renderMainContext";
import { screen } from "@testing-library/react";
import Board from ".";
import { TEST_MAIN_CONTEXT } from "../../../__fixtures__/testData";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const TEST_MAIN_CTX = {
  value: TEST_MAIN_CONTEXT,
};

test("Should render the board", () => {
  renderMainContext(<Board />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const board = screen.getByTestId("rf__wrapper");
  const reactFlow = screen.getByText(/react flow/i);

  expect(board).toBeInTheDocument();
  expect(reactFlow).toBeInTheDocument();
});
