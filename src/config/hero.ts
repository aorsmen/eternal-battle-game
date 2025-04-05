import {
  HeroBiographyMapType,
  HeroAppearanceMapType,
  HeroStatsMapType,
  HeroSkillsMapType,
} from "../types/node.types";
import {
  StatGraphDataType,
  SkillGraphDataType,
  StatsNamesType,
  SkillsType,
  SkillNamesType,
} from "../types/main.types";
import {
  YELLOW_LIGHT,
  YELLOW_DARK,
  ORANGE_LIGHT,
  ORANGE_DARK,
  BROWN_LIGHT,
  BROWN_DARK,
  BG_COLOR,
} from "./general";

export const heroDataMap = {
  biography: {
    title: "Biography",
    rows: [{ label: "Full Name", key: "fullName" }],
  },
};

export const biographyDataMap: HeroBiographyMapType = {
  title: "Biography",
  rows: [
    { label: "Full Name", key: "fullName" },
    { label: "Place of Birth", key: "placeOfBirth" },
    { label: "Alignment", key: "alignment" },
    { label: "Publisher", key: "publisher" },
    { label: "Alter Egos", key: "alterEgos" },
    { label: "Aliases", key: "aliases" },
  ],
};

export const appearanceDataMap: HeroAppearanceMapType = {
  title: "Appearance",
  rows: [
    { label: "Race", key: "race" },
    { label: "Gender", key: "gender" },
    { label: "Hair Color", key: "hairColor" },
    { label: "Eye Color", key: "eyeColor" },
    { label: "Height", key: "height" },
    { label: "Weight", key: "weight" },
  ],
};

export const statsDataMap: HeroStatsMapType = {
  title: "Stats",
  rows: [
    { label: "Intelligence", key: "intelligence" },
    { label: "Strength", key: "strength" },
    { label: "Speed", key: "speed" },
    { label: "Durability", key: "durability" },
    { label: "Power", key: "power" },
    { label: "Combat", key: "combat" },
  ],
};

export const skillsDataMap: HeroSkillsMapType = {
  title: "Skills",
  rows: [
    { label: "Attack Power", key: "attackPower" },
    { label: "Acuracy", key: "acuracy" },
    { label: "Attack Speed", key: "attackSpeed" },
    { label: "Defense Rating", key: "defenseRating" },
    { label: "Evasion", key: "evasion" },
    { label: "Survival", key: "survival" },
  ],
};

export const graphColors = [
  { fill: YELLOW_LIGHT, stroke: YELLOW_DARK },
  { fill: ORANGE_LIGHT, stroke: ORANGE_DARK },
  { fill: BROWN_LIGHT, stroke: BROWN_DARK },
  { fill: "#1c1b19", stroke: BG_COLOR },
];

export const heroStats: { [key in StatsNamesType]: string } = {
  intelligence: "Intelligence",
  strength: "Strength",
  speed: "Speed",
  durability: "Durability",
  power: "Power",
  combat: "Combat",
};

export const heroSkills: { [key in SkillNamesType]: string } = {
  attackPower: "Attack Power",
  acuracy: "Acuracy",
  attackSpeed: "Attack Speed",
  defenseRating: "Defense Rating",
  evasion: "Evasion",
  survival: "Survival",
};

export const statGraphKeys: (keyof StatGraphDataType)[] = ["a", "b", "c", "d"];
export const skillGraphKeys: (keyof SkillGraphDataType)[] = [
  "a",
  "b",
  "c",
  "d",
];

export const heroSkillModel: SkillsType = {
  attackPower: 0,
  acuracy: 0,
  attackSpeed: 0,
  defenseRating: 0,
  evasion: 0,
  survival: 0,
};
