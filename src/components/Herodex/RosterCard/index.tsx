import { memo } from "react";
import { RosterHeroType } from "@/types/main.types";
import { HeroCardStats } from "@/components/HeroCard/styled.components";
import {
  CardWrapper,
  CardLink,
  CardName,
  CardArt,
  CardRole,
  CompareButton,
} from "./styled.components";

const RosterCard = ({
  hero,
  selected,
  compareFull,
  onToggleCompare,
}: {
  hero: RosterHeroType;
  selected: boolean;
  compareFull: boolean;
  onToggleCompare: (id: string) => void;
}) => {
  const { id, name, role, side, images, values } = hero;
  const disabled = !selected && compareFull;
  const compareLabel = selected
    ? "In compare"
    : disabled
      ? "Compare full"
      : "Compare";

  return (
    <CardWrapper side={side} selected={selected}>
      <CardLink to={`/herodex/${id}`} label={`${name}, open details`}>
        <CardName name={name} />
        <CardArt side={side} src={images.md} />
        <CardRole text={role} />
      </CardLink>
      <HeroCardStats
        attack={values.attack}
        defense={values.defense}
        size="lg"
      />
      <CompareButton
        label={compareLabel}
        name={name}
        selected={selected}
        disabled={disabled}
        onClick={() => onToggleCompare(id)}
      />
    </CardWrapper>
  );
};

export default memo(RosterCard);
