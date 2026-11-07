import { HeroDataType } from "@/types/main.types";
import { heroSkills, heroStats } from "@/config/hero";
import { EB_GOLD, EB_HERO, EB_VILLAIN } from "@/config/general";
import CharacterSection from "@/components/Herodex/CharacterSection";
import { PanelGrid } from "@/components/Herodex/CharacterSection/styled.components";
import { StatBar } from "./styled.components";

const CharacterStats = ({ hero }: { hero: HeroDataType }) => {
  const statColor = hero.biography.alignment === "good" ? EB_HERO : EB_VILLAIN;

  return (
    <PanelGrid minWidth={320} gap={24}>
      <CharacterSection title="Stats">
        {Object.entries(heroStats).map(([key, label]) => (
          <StatBar
            key={key}
            label={label}
            value={hero.powerstats[key as keyof typeof heroStats]}
            color={statColor}
          />
        ))}
      </CharacterSection>
      <CharacterSection title="Skills">
        {Object.entries(heroSkills).map(([key, label]) => (
          <StatBar
            key={key}
            label={label}
            value={hero.skills[key as keyof typeof heroSkills]}
            color={EB_GOLD}
          />
        ))}
      </CharacterSection>
    </PanelGrid>
  );
};

export default CharacterStats;
