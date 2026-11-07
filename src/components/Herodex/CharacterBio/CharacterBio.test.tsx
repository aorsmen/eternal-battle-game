// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen, within } from "@testing-library/react";
import CharacterBio from ".";
import { TEST_HERO_DATA, TEST_VILLAIN_DATA } from "@/__fixtures__/testData";

const renderBio = (hero) =>
  renderWithProviders(<CharacterBio hero={hero} />, { withRouter: false });

test("Should render identity and origin details", () => {
  renderBio(TEST_HERO_DATA);

  const identity = screen.getByRole("region", { name: "Identity" });
  expect(
    within(identity).getByText("Natasha Romanoff", { selector: "span" })
  ).toBeInTheDocument();
  expect(within(identity).getAllByRole("listitem")).toHaveLength(
    TEST_HERO_DATA.biography.aliases.length
  );
  expect(
    within(identity).getByText(/no alter egos found/i)
  ).toBeInTheDocument();

  const origin = screen.getByRole("region", { name: "Origin" });
  // placeOfBirth is "-" in the data
  expect(within(origin).getByText("Unknown")).toBeInTheDocument();
  expect(within(origin).getByText("Marvel Comics")).toBeInTheDocument();
  expect(within(origin).getByText("Good")).toBeInTheDocument();
  expect(
    within(origin).getByText(/plays in the hero deck/i)
  ).toBeInTheDocument();
});

test("Should show the villain alignment and empty aliases", () => {
  renderBio({
    ...TEST_VILLAIN_DATA,
    biography: { ...TEST_VILLAIN_DATA.biography, aliases: ["-"] },
  });

  expect(screen.getByText("Bad")).toBeInTheDocument();
  expect(screen.getByText(/plays in the villain deck/i)).toBeInTheDocument();
  expect(screen.getByText(/no aliases found/i)).toBeInTheDocument();
});
