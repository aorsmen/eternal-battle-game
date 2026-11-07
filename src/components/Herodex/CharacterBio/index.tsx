import { HeroDataType } from "@/types/main.types";
import { isUnknownValue } from "@/helpers/hero";
import CharacterSection from "@/components/Herodex/CharacterSection";
import {
  EmptyChip,
  PanelGrid,
} from "@/components/Herodex/CharacterSection/styled.components";
import {
  FieldList,
  Field,
  ValueText,
  FullNameText,
  AliasList,
  Alignment,
  PinIcon,
  BookIcon,
} from "./styled.components";

const renderValue = (text?: string | null) =>
  isUnknownValue(text) ? (
    <EmptyChip text="Unknown" />
  ) : (
    <ValueText text={text as string} />
  );

const CharacterBio = ({ hero }: { hero: HeroDataType }) => {
  const { fullName, aliases, alterEgos, placeOfBirth, publisher, alignment } =
    hero.biography;
  const knownAliases = (aliases ?? []).filter(
    (alias) => !isUnknownValue(alias)
  );
  const hasAlterEgos =
    !isUnknownValue(alterEgos) && !/^no alter egos found/i.test(alterEgos);

  return (
    <PanelGrid minWidth={320} gap={24}>
      <CharacterSection title="Identity">
        <FieldList>
          <Field label="Full name">
            {isUnknownValue(fullName) ? (
              <EmptyChip text="Unknown" />
            ) : (
              <FullNameText text={fullName} />
            )}
          </Field>
          <Field label="Aliases">
            {knownAliases.length > 0 ? (
              <AliasList aliases={knownAliases} />
            ) : (
              <EmptyChip text="No aliases found" />
            )}
          </Field>
          <Field label="Alter egos">
            {hasAlterEgos ? (
              renderValue(alterEgos)
            ) : (
              <EmptyChip text="No alter egos found" />
            )}
          </Field>
        </FieldList>
      </CharacterSection>
      <CharacterSection title="Origin">
        <FieldList>
          <Field
            label={
              <>
                <PinIcon />
                Place of birth
              </>
            }
          >
            {renderValue(placeOfBirth)}
          </Field>
          <Field
            label={
              <>
                <BookIcon />
                Publisher
              </>
            }
          >
            {renderValue(publisher)}
          </Field>
          <Field label="Alignment">
            <Alignment isHero={alignment === "good"} />
          </Field>
        </FieldList>
      </CharacterSection>
    </PanelGrid>
  );
};

export default CharacterBio;
