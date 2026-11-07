import { useMemo, useState } from "react";
import { HerodexSideFilterType, RosterHeroType } from "@/types/main.types";
import { COMPARE_LIMIT } from "@/config/hero";
import { matchesRosterSearch } from "@/helpers/hero";
import {
  PickerModal,
  PickerLayout,
  PickerDialog,
  PickerHeader,
  PickerFilters,
  PickerSearch,
  PickerSideFilter,
  PickerList,
  PickerRow,
  PickerEmpty,
} from "./styled.components";

const TITLE_ID = "compare-picker-title";

// Mounted only while open, so the search starts empty every time
const ComparePicker = ({
  roster,
  compareIds,
  onAdd,
  onClose,
}: {
  roster: RosterHeroType[];
  compareIds: string[];
  onAdd: (id: string) => void;
  onClose: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [side, setSide] = useState<HerodexSideFilterType>("all");
  const slotsLeft = COMPARE_LIMIT - compareIds.length;

  const options = useMemo(
    () =>
      roster
        .filter(
          (hero) =>
            (side === "all" || hero.side === side) &&
            matchesRosterSearch(hero, query)
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [roster, side, query]
  );

  const add = (id: string) => {
    onAdd(id);
    onClose();
  };

  return (
    <PickerModal labelledBy={TITLE_ID} onClose={onClose}>
      <PickerLayout>
        <PickerDialog labelledBy={TITLE_ID}>
          <PickerHeader
            titleId={TITLE_ID}
            slotsLeft={slotsLeft}
            onClose={onClose}
          />
          <PickerFilters>
            <PickerSearch value={query} onChange={setQuery} />
            <PickerSideFilter value={side} onChange={setSide} />
          </PickerFilters>
          <PickerList>
            {options.map((hero) => (
              <PickerRow
                key={hero.id}
                hero={hero}
                added={compareIds.includes(hero.id)}
                disabled={slotsLeft <= 0}
                onAdd={() => add(hero.id)}
              />
            ))}
            {options.length === 0 && <PickerEmpty />}
          </PickerList>
        </PickerDialog>
      </PickerLayout>
    </PickerModal>
  );
};

export default ComparePicker;
