// @ts-nocheck
import { renderWithProviders } from "@/__fixtures__/renderWithProviders";
import { screen, within } from "@testing-library/react";
import Credits from ".";
import { CREDITS_CONTENT, GITHUB_URL } from "@/config/pages";

const renderCredits = () =>
  renderWithProviders(<Credits />, { withRouter: true });

test("Should render the title, tagline and home link", () => {
  renderCredits();

  expect(
    screen.getByRole("heading", { level: 1, name: /credits/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/the team behind the battle/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
    "href",
    "/"
  );
});

test("Should render every credits section with its content", () => {
  renderCredits();

  CREDITS_CONTENT.forEach((section) => {
    const region = screen.getByRole("region", { name: section.title });

    if (section.type === "tags") {
      expect(
        within(region)
          .getAllByRole("listitem")
          .map((item) => item.textContent)
      ).toEqual(section.text);
    } else {
      section.text.forEach((name) =>
        expect(within(region).getByText(name)).toBeInTheDocument()
      );
    }
  });
});

test("Should link to the source code and the battle", () => {
  renderCredits();

  const source = screen.getByRole("link", { name: /source on github/i });
  expect(source).toHaveAttribute("href", GITHUB_URL);
  expect(source).toHaveAttribute("target", "_blank");
  expect(source).toHaveAttribute("rel", "noopener noreferrer");
  expect(screen.getByRole("link", { name: /play now/i })).toHaveAttribute(
    "href",
    "/battle"
  );
});
