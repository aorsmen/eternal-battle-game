import { RosterHeroType } from "@/types/main.types";
import { COMPARE_LIMIT } from "@/config/hero";
import { EB_COMPARE_COLORS } from "@/config/general";
import { getCompareLink } from "@/helpers/hero";
import {
  TrayWrapper,
  TrayTitle,
  SlotList,
  PickedItem,
  EmptySlot,
  TrayActions,
  ClearButton,
  CompareLink,
} from "./styled.components";

const CompareTray = ({
  picked,
  onRemove,
  onClear,
}: {
  picked: RosterHeroType[];
  onRemove: (id: string) => void;
  onClear: () => void;
}) => {
  const emptySlots = Math.max(COMPARE_LIMIT - picked.length, 0);
  const compareLink =
    picked.length >= 2 ? getCompareLink(picked.map((hero) => hero.id)) : null;

  return (
    <TrayWrapper>
      <TrayTitle count={picked.length} />
      <SlotList>
        {picked.map((hero, index) => (
          <PickedItem
            key={hero.id}
            hero={hero}
            color={EB_COMPARE_COLORS[index]}
            onRemove={() => onRemove(hero.id)}
          />
        ))}
        {Array.from({ length: emptySlots }, (_, index) => (
          <EmptySlot key={index} />
        ))}
      </SlotList>
      <TrayActions>
        <ClearButton onClick={onClear} />
        <CompareLink to={compareLink} />
      </TrayActions>
    </TrayWrapper>
  );
};

export default CompareTray;
