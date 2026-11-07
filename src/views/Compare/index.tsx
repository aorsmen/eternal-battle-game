import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useHerodexContext from "@/hooks/useHerodexContext";
import { CompareSeriesType, CompareTabType } from "@/types/main.types";
import { EB_COMPARE_COLORS } from "@/config/general";
import { COMPARE_LIMIT, heroSkills, heroStats } from "@/config/hero";
import TopBar from "@/components/UI/TopBar";
import Loading from "@/components/UI/Loading";
import CompareRadar from "@/components/Herodex/CompareRadar";
import CompareTable from "@/components/Herodex/CompareTable";
import CompareMatchups from "@/components/Herodex/CompareMatchups";
import ComparePicker from "@/components/Herodex/ComparePicker";
import {
  PageMain,
  PageHeader,
  PeopleGrid,
  PersonCard,
  AddSlot,
  PanelRow,
  Panel,
  ChartToggle,
  PanelNote,
  NoPicks,
} from "./styled.components";

const TAB_NAMES: { [key in CompareTabType]: string } = {
  stats: "Stats",
  skills: "Skills",
};

const TAB_FIELDS = {
  stats: Object.keys(heroStats) as (keyof typeof heroStats)[],
  skills: Object.keys(heroSkills) as (keyof typeof heroSkills)[],
};

const TAB_LABELS = {
  stats: Object.values(heroStats),
  skills: Object.values(heroSkills),
};

const Compare = () => {
  const { isLoading, roster, compareIds, toggleCompare, getHeroById } =
    useHerodexContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<CompareTabType>("stats");
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Keep the address in step with the picks so the page can be shared
  const idsParam = compareIds.join(",");
  useEffect(() => {
    if (isLoading || (searchParams.get("ids") ?? "") === idsParam) return;
    setSearchParams(idsParam ? { ids: idsParam } : {}, { replace: true });
  }, [isLoading, idsParam, searchParams, setSearchParams]);

  if (isLoading) {
    return (
      <PageMain>
        <TopBar backTo="/herodex" backLabel="Herodex" />
        <Loading type="static" />
      </PageMain>
    );
  }

  // Colours follow the pick order, the same as in the compare tray
  const people = compareIds.flatMap((id, index) => {
    const hero = getHeroById(id);
    return hero
      ? [
          {
            hero,
            color: EB_COMPARE_COLORS[index],
            shown: !hiddenIds.includes(id),
          },
        ]
      : [];
  });

  const series: CompareSeriesType[] = people
    .filter((person) => person.shown)
    .map(({ hero, color }) => ({
      id: hero.id,
      name: hero.name,
      color,
      values: TAB_FIELDS[tab].map((field) =>
        tab === "stats"
          ? hero.powerstats[field as keyof typeof heroStats]
          : hero.skills[field as keyof typeof heroSkills]
      ),
    }));

  const toggleShown = (id: string) =>
    setHiddenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const remove = (id: string) => {
    toggleCompare(id);
    setHiddenIds((prev) => prev.filter((item) => item !== id));
  };

  const slotsLeft = COMPARE_LIMIT - people.length;

  return (
    <PageMain>
      <TopBar backTo="/herodex" backLabel="Herodex" />
      <PageHeader />
      <PeopleGrid>
        {people.map(({ hero, color, shown }) => (
          <PersonCard
            key={hero.id}
            hero={hero}
            color={color}
            shown={shown}
            onToggleShown={() => toggleShown(hero.id)}
            onRemove={() => remove(hero.id)}
          />
        ))}
        {slotsLeft > 0 && (
          <AddSlot slotsLeft={slotsLeft} onClick={() => setPickerOpen(true)} />
        )}
      </PeopleGrid>
      {people.length === 0 ? (
        <NoPicks />
      ) : (
        <>
          <PanelRow>
            <Panel
              title="Power profile"
              grow="1 1 460px"
              actions={<ChartToggle value={tab} onChange={setTab} />}
            >
              <CompareRadar
                labels={TAB_LABELS[tab]}
                series={series}
                title={`Radar chart of ${TAB_NAMES[tab].toLowerCase()} for the characters being compared`}
              />
            </Panel>
            <Panel title={`Head to head · ${TAB_NAMES[tab]}`} grow="1 1 420px">
              <CompareTable labels={TAB_LABELS[tab]} columns={series} />
              <PanelNote>Gold marks the highest value in each row.</PanelNote>
            </Panel>
          </PanelRow>
          <Panel
            title="If these cards met in battle"
            label="Card matchups"
            intro="Read across a row: the result for that character against each opponent, using ATK and DEF."
          >
            {people.length > 1 ? (
              <CompareMatchups
                cards={people.map(({ hero, color }) => ({
                  id: hero.id,
                  name: hero.name,
                  color,
                  values: hero.values,
                }))}
              />
            ) : (
              <PanelNote>Add another character to see who wins.</PanelNote>
            )}
          </Panel>
        </>
      )}
      {pickerOpen && (
        <ComparePicker
          roster={roster}
          compareIds={compareIds}
          onAdd={toggleCompare}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </PageMain>
  );
};

export default Compare;
