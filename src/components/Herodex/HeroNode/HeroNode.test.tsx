// @ts-nocheck
import { renderMainContext } from "../../../__fixtures__/renderMainContext";
import { screen, fireEvent } from "@testing-library/react";
import HeroNode from ".";
import {
  TEST_HERO_DATA,
  TEST_HERO_NODE_DATA,
  TEST_MAIN_CONTEXT,
} from "../../../__fixtures__/testData";
import { vi } from "vitest";

const TEST_MAIN_CTX = {
  value: TEST_MAIN_CONTEXT,
};

const mockDetailsHandler = vi.fn();
const mockRemoveHeroHandler = vi.fn();
const mockSetCompareHandler = vi.fn();

TEST_MAIN_CONTEXT.setNodeDetails = mockDetailsHandler;
TEST_MAIN_CONTEXT.removeHero = mockRemoveHeroHandler;
TEST_MAIN_CONTEXT.setCompare = mockSetCompareHandler;

test("Should render card data correctly", () => {
  renderMainContext(<HeroNode {...TEST_HERO_NODE_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const image = screen.getByAltText(TEST_HERO_DATA.name);
  const name = screen.getByText(TEST_HERO_DATA.name);
  const type = screen.getByText(
    TEST_HERO_DATA.biography.alignment === "good" ? "Hero" : "Villain"
  );

  expect(image).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(type).toBeInTheDocument();
});

test("Should not render node toolbar if the node is not selected", () => {
  renderMainContext(<HeroNode {...TEST_HERO_NODE_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const infoIcon = screen.queryByTestId("InfoIcon");
  const deleteIcon = screen.queryByTestId("DeleteOutlineIcon");
  const compare = screen.queryByText(/compare/i);

  expect(infoIcon).not.toBeInTheDocument();
  expect(deleteIcon).not.toBeInTheDocument();
  expect(compare).not.toBeInTheDocument();
});

test("Should render node toolbar if the node is selected", () => {
  TEST_HERO_NODE_DATA.selected = true;

  renderMainContext(<HeroNode {...TEST_HERO_NODE_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const infoIcon = screen.getByTestId("InfoIcon");
  const deleteIcon = screen.getByTestId("DeleteOutlineIcon");
  const compare = screen.getByText(/compare/i);

  expect(infoIcon).toBeInTheDocument();
  expect(deleteIcon).toBeInTheDocument();
  expect(compare).toBeInTheDocument();
});

test("Should render preview image", () => {
  renderMainContext(<HeroNode {...TEST_HERO_NODE_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const previewBtn = screen.getByTestId("VisibilityIcon");

  expect(previewBtn).toBeInTheDocument();

  fireEvent.click(previewBtn);

  const image = screen.getAllByAltText(TEST_HERO_DATA.name);

  expect(image).toHaveLength(2);
});

test("Should render attack/defense correctly", () => {
  renderMainContext(<HeroNode {...TEST_HERO_NODE_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const values = screen.getByText(
    `${TEST_HERO_DATA.values.attack}/${TEST_HERO_DATA.values.defense}`
  );

  expect(values).toBeInTheDocument();
});

test("Should call the details handler with the node id when click the details button", () => {
  renderMainContext(<HeroNode {...TEST_HERO_NODE_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const detailsBtn = screen.getByRole("button", { name: "details" });

  expect(detailsBtn).toBeInTheDocument();

  fireEvent.click(detailsBtn);

  expect(mockDetailsHandler).toHaveBeenCalled();
  expect(mockDetailsHandler).toHaveBeenCalledWith(TEST_HERO_NODE_DATA.id);
});

test("Should call the details handler with empty string and remove handler with the node id when click the remove button", () => {
  renderMainContext(<HeroNode {...TEST_HERO_NODE_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const removeBtn = screen.getByRole("button", { name: "remove" });

  expect(removeBtn).toBeInTheDocument();

  fireEvent.click(removeBtn);

  expect(mockDetailsHandler).toHaveBeenCalled();
  expect(mockDetailsHandler).toHaveBeenCalledWith("");
  expect(mockRemoveHeroHandler).toHaveBeenCalled();
  expect(mockRemoveHeroHandler).toHaveBeenCalledWith(TEST_HERO_NODE_DATA.id);
});

test("Should add to compare list when click the compare checkbox", () => {
  renderMainContext(<HeroNode {...TEST_HERO_NODE_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const compareCheckbox = screen.getByRole("checkbox", { name: /compare/i });

  expect(compareCheckbox).toBeInTheDocument();

  fireEvent.click(compareCheckbox);

  expect(mockSetCompareHandler).toHaveBeenCalled();
  expect(mockSetCompareHandler).toHaveBeenCalledWith(
    TEST_HERO_NODE_DATA.id,
    "add"
  );
});

test("Should remove from compare list if it is already there", () => {
  TEST_MAIN_CONTEXT.compareList = [TEST_HERO_NODE_DATA.id];

  renderMainContext(<HeroNode {...TEST_HERO_NODE_DATA} />, {
    providerProps: TEST_MAIN_CTX,
    withRouter: false,
  });

  const compareCheckbox = screen.getByRole("checkbox", { name: /compare/i });

  expect(compareCheckbox).toBeInTheDocument();

  fireEvent.click(compareCheckbox);

  expect(mockSetCompareHandler).toHaveBeenCalled();
  expect(mockSetCompareHandler).toHaveBeenCalledWith(
    TEST_HERO_NODE_DATA.id,
    "remove"
  );
});
