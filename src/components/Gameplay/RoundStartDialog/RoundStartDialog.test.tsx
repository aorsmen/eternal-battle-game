// @ts-nocheck
import { renderGameContext } from "../../../__fixtures__/renderGameContext";
import { screen, waitFor } from "@testing-library/react";
import RoundStartDialog from ".";
import { TEST_GAME_CONTEXT } from "../../../__fixtures__/testData";
import { vi } from "vitest";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

const mockCloseHandler = vi.fn();

test("Should not render the dialog", () => {
  renderGameContext(
    <RoundStartDialog isOpen={false} onClose={mockCloseHandler} />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const round = screen.queryByText(/round 1/i);

  expect(round).not.toBeInTheDocument();
});

test("Should render the dialog and round correctly and auto close the dialog", () => {
  renderGameContext(
    <RoundStartDialog isOpen={true} onClose={mockCloseHandler} />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const round = screen.getByText(/round 1/i);

  expect(round).toBeInTheDocument();

  waitFor(() => {
    const round = screen.queryByText(/round 1/i);

    expect(round).not.toBeInTheDocument();
  });
});
