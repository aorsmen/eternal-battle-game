// @ts-nocheck
import { renderGameContext } from "../../../__fixtures__/renderGameContext";
import { screen, fireEvent } from "@testing-library/react";
import PlayerCardMotion from ".";
import {
  TEST_GAME_CONTEXT,
  TEST_HERO_DATA,
} from "../../../__fixtures__/testData";
import { vi } from "vitest";

const TEST_GAME_CTX = {
  value: TEST_GAME_CONTEXT,
};

const clickHandler = vi.fn();

test("Should render the player card back", () => {
  renderGameContext(
    <PlayerCardMotion
      index={0}
      isFlipped={false}
      isRevealed={false}
      result="draw"
      onClick={clickHandler}
    />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const cardBack = screen.getByTestId("player-card-back");

  expect(cardBack).toBeInTheDocument();
});

test("Should render the player card data", () => {
  renderGameContext(
    <PlayerCardMotion
      index={0}
      isFlipped={true}
      isRevealed={true}
      result="draw"
      onClick={clickHandler}
    />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const image = screen.getByAltText(TEST_HERO_DATA.name);
  const name = screen.getByText(TEST_HERO_DATA.name);
  const type = screen.getByText(
    TEST_HERO_DATA.biography.alignment === "good" ? "Hero" : "Villain"
  );
  const desc = screen.getByText(TEST_HERO_DATA.work.occupation);

  expect(image).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  expect(desc).toBeInTheDocument();
});

test("Should render the preview image", () => {
  renderGameContext(
    <PlayerCardMotion
      index={0}
      isFlipped={true}
      isRevealed={true}
      result="draw"
      onClick={clickHandler}
    />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const previewBtn = screen.getByTestId("VisibilityIcon");

  expect(previewBtn).toBeInTheDocument();

  fireEvent.click(previewBtn);

  const image = screen.getAllByAltText(TEST_HERO_DATA.name);

  expect(image).toHaveLength(2);
});

test("Should render attack/defense correctly", () => {
  renderGameContext(
    <PlayerCardMotion
      index={0}
      isFlipped={true}
      isRevealed={true}
      result="draw"
      onClick={clickHandler}
    />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const values = screen.getByText(
    `${TEST_HERO_DATA.values.attack}/${TEST_HERO_DATA.values.defense}`
  );

  expect(values).toBeInTheDocument();
});

test("Should call the correct function when click the player card", () => {
  renderGameContext(
    <PlayerCardMotion
      index={0}
      isFlipped={false}
      isRevealed={false}
      result="draw"
      onClick={clickHandler}
    />,
    {
      providerProps: TEST_GAME_CTX,
      withRouter: false,
    }
  );

  const cardBtn = screen.getByRole("button");

  expect(cardBtn).toBeInTheDocument();

  fireEvent.click(cardBtn);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
