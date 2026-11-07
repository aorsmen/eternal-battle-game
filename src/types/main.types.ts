export type HeroItemType = {
  id: string;
  label: string;
};

export type SkillNamesType =
  | "attackPower"
  | "acuracy"
  | "attackSpeed"
  | "defenseRating"
  | "evasion"
  | "survival";
export type StatsNamesType =
  | "intelligence"
  | "strength"
  | "speed"
  | "durability"
  | "power"
  | "combat";
export type ValuesNamesType = "attack" | "defense";

export type SkillsType = {
  [key in SkillNamesType]: number;
};

export type PowerStatType = {
  [key in StatsNamesType]: number;
};

export type HeroValuesType = {
  [key in ValuesNamesType]: number;
};

export type BiographyType = {
  fullName: string;
  alterEgos: string;
  aliases: string[];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: string;
  alignment: "good" | "bad";
};

export type AppearanceType = {
  gender: "Female" | "Male";
  race: string;
  height: [string, string];
  weight: [string, string];
  eyeColor: string;
  hairColor: string;
};

export type HeroDataType = {
  id: string;
  name: string;
  slug: string;
  powerstats: PowerStatType;
  biography: BiographyType;
  appearance: AppearanceType;
  skills: SkillsType;
  values: HeroValuesType;
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    groupAffiliation: string;
    relatives: string;
  };
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  used?: boolean;
  bgColor?: string;
};

export type HerodexSideType = "heroes" | "villains";
export type HerodexSideFilterType = "all" | HerodexSideType;
export type HerodexSortType = "name" | "nameDesc" | "attack" | "defense";
export type CompareTabType = "stats" | "skills";

// One character on the compare page; values follow the chart's axis order
export type CompareSeriesType = {
  id: string;
  name: string;
  color: string;
  values: number[];
};

export type RosterHeroType = {
  id: string;
  name: string;
  role: string;
  aliases: string[];
  side: HerodexSideType;
  images: HeroDataType["images"];
  values: HeroValuesType;
};

export type HerodexContextType = {
  roster: RosterHeroType[];
  isLoading: boolean;
  query: string;
  side: HerodexSideFilterType;
  sort: HerodexSortType;
  shown: RosterHeroType[];
  page: number;
  pageCount: number;
  pageItems: RosterHeroType[];
  counts: { [key in HerodexSideFilterType]: number };
  compareIds: string[];
  picked: RosterHeroType[];
  compareFull: boolean;
  setQuery: (value: string) => void;
  setSide: (value: HerodexSideFilterType) => void;
  setSort: (value: HerodexSortType) => void;
  setPage: (value: number) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  getHeroById: (id: string) => HeroDataType | null;
};
