// @ts-nocheck
import { renderGameContext } from "@/__fixtures__/renderGameContext";
import { screen, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import Gameplay from ".";
import { TEST_GAME_CONTEXT } from "@/__fixtures__/testData";

const renderGameplay = (value) => {
  renderGameContext(
    <MemoryRouter initialEntries={["/battle/play"]}>
      <Routes>
        <Route path="battle">
          <Route index element={<div>Side selection page</div>} />
          <Route path="play" element={<Gameplay />} />
        </Route>
      </Routes>
    </MemoryRouter>,
    { providerProps: { value }, withRouter: false }
  );
};

test("Should render title and back link in the header", () => {
  renderGameplay(TEST_GAME_CONTEXT);

  const container = screen.getByRole("banner", {
    hidden: true,
  });
  const title = within(container).getByText(/battle/i);
  const backLink = within(container).getByRole("link", {
    name: /back/i,
    hidden: true,
  });

  expect(title).toBeInTheDocument();
  expect(backLink).toBeInTheDocument();
});

test("Should redirect to side selection when no side is chosen", () => {
  renderGameplay({
    ...TEST_GAME_CONTEXT,
    sides: {
      ...TEST_GAME_CONTEXT.sides,
      player: { ...TEST_GAME_CONTEXT.sides.player, type: null },
    },
  });

  expect(screen.getByText(/side selection page/i)).toBeInTheDocument();
});
