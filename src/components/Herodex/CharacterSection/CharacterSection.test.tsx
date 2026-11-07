// @ts-nocheck
import { render, screen } from "@testing-library/react";
import CharacterSection from ".";
import { EmptyChip, FieldLabel, PanelGrid, Tile } from "./styled.components";

test("Should render a titled section", () => {
  render(
    <CharacterSection title="Stats">
      <p>content</p>
    </CharacterSection>
  );

  expect(screen.getByRole("region", { name: "Stats" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 2, name: "Stats" })
  ).toBeInTheDocument();
  expect(screen.getByText("content")).toBeInTheDocument();
});

test("Should render the label, chip and tile helpers", () => {
  render(
    <PanelGrid minWidth={240} gap={16}>
      <Tile>
        <FieldLabel>Race</FieldLabel>
        <EmptyChip text="Unknown" />
      </Tile>
    </PanelGrid>
  );

  expect(screen.getByText("Race")).toBeInTheDocument();
  expect(screen.getByText("Unknown")).toBeInTheDocument();
});
