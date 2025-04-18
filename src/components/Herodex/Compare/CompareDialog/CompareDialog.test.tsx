// @ts-nocheck
import { renderMainContext } from "../../../../__fixtures__/renderMainContext";
import { screen, fireEvent } from "@testing-library/react";
import CompareDialog from ".";
import {
  TEST_MAIN_CONTEXT,
  TEST_HERO_DATA,
  TEST_HERO_DATA_2,
} from "../../../../__fixtures__/testData";
import { vi } from "vitest";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const TEST_HERO_DATA_LIST = [TEST_HERO_DATA, TEST_HERO_DATA_2];
const TEST_MAIN_CTX = {
  value: TEST_MAIN_CONTEXT,
};

const mockCloseHandler = vi.fn();

TEST_MAIN_CONTEXT.compareList = [TEST_HERO_DATA.id, TEST_HERO_DATA_2.id];
TEST_MAIN_CONTEXT.getHeroById = (id: string) => {
  return TEST_HERO_DATA_LIST.find((hero) => hero.id === id);
};

test("Should not render the compare dialog", () => {
  renderMainContext(
    <CompareDialog isOpen={false} onClose={mockCloseHandler} />,
    {
      providerProps: TEST_MAIN_CTX,
      withRouter: false,
    }
  );

  const title = screen.queryByText(/compare/i);
  const closeBtn = screen.queryByRole("button", {
    name: /close/i,
  });

  expect(title).not.toBeInTheDocument();
  expect(closeBtn).not.toBeInTheDocument();
});

test("Should render the compare dialog", () => {
  renderMainContext(
    <CompareDialog isOpen={true} onClose={mockCloseHandler} />,
    {
      providerProps: TEST_MAIN_CTX,
      withRouter: false,
    }
  );

  const title = screen.getByText(/compare/i);
  const closeBtn = screen.getByRole("button", {
    name: /close/i,
  });

  expect(title).toBeInTheDocument();
  expect(closeBtn).toBeInTheDocument();
});

test("Should render the compare list data correctly", () => {
  renderMainContext(
    <CompareDialog isOpen={true} onClose={mockCloseHandler} />,
    {
      providerProps: TEST_MAIN_CTX,
      withRouter: false,
    }
  );

  const hero1 = screen.getByRole("img", {
    name: TEST_HERO_DATA.name,
  });
  const hero2 = screen.getByRole("img", {
    name: TEST_HERO_DATA_2.name,
  });
  const stat = screen.getByText(/stats/i);
  const skills = screen.getByText(/skills/i);

  expect(hero1).toBeInTheDocument();
  expect(hero2).toBeInTheDocument();
  expect(stat).toBeInTheDocument();
  expect(skills).toBeInTheDocument();
});

test("Should call the close function when click the close button", () => {
  renderMainContext(
    <CompareDialog isOpen={true} onClose={mockCloseHandler} />,
    {
      providerProps: TEST_MAIN_CTX,
      withRouter: false,
    }
  );

  const closeBtn = screen.getByRole("button", {
    name: /close/i,
  });

  expect(closeBtn).toBeInTheDocument();

  fireEvent.click(closeBtn);

  expect(mockCloseHandler).toHaveBeenCalled();
});
