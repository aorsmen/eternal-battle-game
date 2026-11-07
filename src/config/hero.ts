import {
  StatsNamesType,
  SkillsType,
  SkillNamesType,
} from "@/types/main.types";

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

export const heroSkillModel: SkillsType = {
  attackPower: 0,
  acuracy: 0,
  attackSpeed: 0,
  defenseRating: 0,
  evasion: 0,
  survival: 0,
};

export const COMPARE_LIMIT = 4;

// Divides evenly into the 2, 3, 4 and 6 column grid layouts
export const HERODEX_PAGE_SIZE = 24;

// Swatch colours for the hair/eye colour names used in the hero data
export const APPEARANCE_COLORS: { [key in string]: string } = {
  amber: "#FFB000",
  auburn: "#8C3B1F",
  black: "#111318",
  blond: "#E8C872",
  blue: "#3D7BE0",
  bown: "#7A4A2A",
  brown: "#7A4A2A",
  brownn: "#7A4A2A",
  gold: "#D4A72C",
  green: "#3FBF6B",
  grey: "#8B93A1",
  hazel: "#8E7240",
  indigo: "#4B4FC4",
  magenta: "#D63AAF",
  orange: "#F08A24",
  pink: "#F28CB8",
  purple: "#8E5BD9",
  red: "#D9363E",
  silver: "#C0C6CF",
  "strawberry blond": "#E3A06B",
  violet: "#7F4FD0",
  white: "#F2F4F7",
  yellow: "#F2C94C",
};

// Reference figure for the height comparison: 6 ft
export const REFERENCE_HEIGHT_CM = 183;
