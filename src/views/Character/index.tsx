import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import useHerodexContext from "@/hooks/useHerodexContext";
import { getHeroRole, isUnknownValue } from "@/helpers/hero";
import Loading from "@/components/UI/Loading";
import CharacterStats from "@/components/Herodex/CharacterStats";
import CharacterBio from "@/components/Herodex/CharacterBio";
import CharacterAppearance from "@/components/Herodex/CharacterAppearance";
import {
  AttackIcon,
  BattleRule,
  CompareActions,
  DefenseIcon,
  DetailTabs,
  DetailTabType,
  DetailTopBar,
  Intro,
  NotFound,
  PageMain,
  Portrait,
  SummaryDetails,
  SummarySection,
  TabPanel,
  ValueRow,
  ValueTile,
} from "./styled.components";

const Character = () => {
  const { id = "" } = useParams();
  const {
    isLoading,
    roster,
    shown,
    compareIds,
    compareFull,
    toggleCompare,
    getHeroById,
  } = useHerodexContext();
  // Kept when moving to the previous/next character
  const [tab, setTab] = useState<DetailTabType>("stats");
  const hero = getHeroById(id);

  // Opening a card from far down the roster should start at the top
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  // Browse in the roster's current filter/sort order; fall back to all
  // characters A–Z when this one is filtered out
  const browseList = useMemo(() => {
    if (shown.some((item) => item.id === id)) return shown;
    return [...roster].sort((a, b) => a.name.localeCompare(b.name));
  }, [shown, roster, id]);

  const index = browseList.findIndex((item) => item.id === id);
  const total = browseList.length;
  const prevId =
    index >= 0 && total > 1
      ? browseList[(index - 1 + total) % total].id
      : undefined;
  const nextId =
    index >= 0 && total > 1 ? browseList[(index + 1) % total].id : undefined;

  const content = () => {
    if (isLoading) return <Loading type="static" />;
    if (!hero) return <NotFound />;

    const inCompare = compareIds.includes(hero.id);
    const { publisher } = hero.biography;
    const subtitle = [
      getHeroRole(hero),
      isUnknownValue(publisher) ? null : publisher,
    ]
      .filter(Boolean)
      .join(" · ");

    return (
      <>
        <SummarySection>
          <Portrait hero={hero} />
          <SummaryDetails>
            <Intro hero={hero} subtitle={subtitle} />
            <ValueRow>
              <ValueTile
                label="ATTACK"
                value={hero.values.attack}
                icon={<AttackIcon />}
              />
              <ValueTile
                label="DEFENCE"
                value={hero.values.defense}
                icon={<DefenseIcon />}
              />
              <BattleRule
                attack={hero.values.attack}
                defense={hero.values.defense}
              />
            </ValueRow>
            <CompareActions
              name={hero.name}
              inCompare={inCompare}
              compareFull={compareFull}
              onToggle={() => toggleCompare(hero.id)}
            />
          </SummaryDetails>
        </SummarySection>
        <DetailTabs value={tab} onChange={setTab} />
        <TabPanel tab={tab}>
          {tab === "stats" && <CharacterStats hero={hero} />}
          {tab === "bio" && <CharacterBio hero={hero} />}
          {tab === "look" && <CharacterAppearance hero={hero} />}
        </TabPanel>
      </>
    );
  };

  return (
    <PageMain>
      <DetailTopBar
        position={index + 1}
        total={index >= 0 ? total : 0}
        prevId={prevId}
        nextId={nextId}
      />
      {content()}
    </PageMain>
  );
};

export default Character;
