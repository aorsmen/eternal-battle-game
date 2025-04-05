import { Node, Position } from "@xyflow/react";
import {
  HeroDataType,
  BiographyType,
  AppearanceType,
  StatsNamesType,
  SkillNamesType,
} from "./main.types";

export type NodeHandle = {
  x: number;
  y: number;
  position: Position;
  id: string | null;
  width?: number;
  height?: number;
  type: "source" | "target";
};

export type HeroNodeType = Node<{
  details: HeroDataType;
}>;

export type HeroBiograpyhRowType = {
  label: string;
  key: keyof BiographyType;
};

export type HeroBiographyMapType = {
  title: string;
  rows: HeroBiograpyhRowType[];
};

export type HeroAppearanceRowType = {
  label: string;
  key: keyof AppearanceType;
};

export type HeroAppearanceMapType = {
  title: string;
  rows: HeroAppearanceRowType[];
};

export type HeroStatsRowType = {
  label: string;
  key: StatsNamesType;
};

export type HeroStatsMapType = {
  title: string;
  rows: HeroStatsRowType[];
};

export type HeroSkillsRowType = {
  label: string;
  key: SkillNamesType;
};

export type HeroSkillsMapType = {
  title: string;
  rows: HeroSkillsRowType[];
};
