// @ts-nocheck
import { screen, fireEvent, render } from "@testing-library/react";
import HeroAvatar from ".";
import { TEST_HERO_DATA } from "../../../__fixtures__/testData";

test("Should render avatar image", () => {
  render(
    <HeroAvatar src={TEST_HERO_DATA.images.xs} alt="test avatar" size={32} />
  );

  const avatar = screen.getByRole("img", {
    name: /test avatar/i,
  });

  expect(avatar).toBeInTheDocument();
});
