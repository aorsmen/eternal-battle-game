import {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  ReactFlowInstance,
} from "@xyflow/react";

type OnChange<ChangeType> = (changes: ChangeType[]) => void;

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

export type MainContextType = {
  nodes: Node[];
  edges: Edge[];
  heroesData: HeroDataType[];
  heroesIsLoading: boolean;
  reactFlowInstance?: ReactFlowInstance;
  nodeDetails: string;
  compareList: string[];
  onNodesChange: OnChange<NodeChange>;
  onEdgesChange: OnChange<EdgeChange>;
  setReactFlowInstance: React.Dispatch<
    React.SetStateAction<ReactFlowInstance | undefined>
  >;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  addHero: (id: string) => void;
  removeHero: (id: string) => void;
  setNodeDetails: React.Dispatch<React.SetStateAction<string>>;
  getHeroById: (id: string) => HeroDataType | null;
  setCompare: (id: string, action: "add" | "remove" | "clear") => void;
};

export type StatGraphDataType = {
  def: StatsNamesType;
  subject: string;
  fullMark: number;
  a?: number;
  b?: number;
  c?: number;
  d?: number;
};

export type SkillGraphDataType = {
  def: SkillNamesType;
  subject: string;
  fullMark: number;
  a?: number;
  b?: number;
  c?: number;
  d?: number;
};
