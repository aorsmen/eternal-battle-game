import { GameContextType } from "../types/game.types";
import { HeroDataType } from "../types/main.types";

export const TEST_HERO_DATA: HeroDataType = {
  id: "107",
  name: "Black Widow",
  slug: "107-black-widow",
  powerstats: {
    intelligence: 75,
    strength: 13,
    speed: 33,
    durability: 30,
    power: 36,
    combat: 100,
  },
  skills: {
    attackPower: 50,
    acuracy: 75,
    attackSpeed: 56,
    defenseRating: 54,
    evasion: 69,
    survival: 68,
  },
  appearance: {
    gender: "Female",
    race: "Human",
    height: ["5'7", "170 cm"],
    weight: ["131 lb", "59 kg"],
    eyeColor: "Green",
    hairColor: "Auburn",
  },
  biography: {
    fullName: "Natasha Romanoff",
    alterEgos: "No alter egos found.",
    aliases: [
      "Yelena Belova",
      "Natasha Romanoff",
      "Natasha",
      "Tasha",
      "Madame Natasha",
      "Nancy Rushman",
      "Laura Matthers",
      "Nadine Roman",
      '"Oktober"',
      "Black Pearl",
      "Ebon Flame",
    ],
    placeOfBirth: "-",
    firstAppearance: "Tales of Suspense #52",
    publisher: "Marvel Comics",
    alignment: "good",
  },
  work: {
    occupation: "Adventurer, Intelligence agent, former ballerina",
    base: "Mobile",
  },
  connections: {
    groupAffiliation:
      'Secret Avengers; formerly Thunderbolts (as Yelena Belova), Nick Fury, Mighty Avengers, S.H.I.E.L.D., Avengers, Champions of Los Angeles, Lady Liberators, KGB, "Marvel Knights", partner of Daredevil, Hawkeye, Boris Turgenov, Logan',
    relatives:
      "Unnamed parents (presumed deceased); Alexi Shostakov (Red Guardian, estranged husband); Vindiktor (alleged brother, deceased)",
  },
  images: {
    xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/107-black-widow.jpg",
    sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/107-black-widow.jpg",
    md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/107-black-widow.jpg",
    lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg",
  },
  values: {
    attack: 4,
    defense: 4,
  },
};

export const TEST_GAME_CONTEXT: GameContextType = {
  sides: {
    player: {
      name: "test user 1",
      type: "heroes",
      score: 0,
    },
    computer: {
      name: "test user 2",
      type: "villains",
      score: 0,
    },
  },
  decks: {
    heroes: [],
    villains: [],
  },
  hands: {
    player: [TEST_HERO_DATA],
    computer: [TEST_HERO_DATA],
  },
  battles: {
    player: {},
    computer: {},
  },
  currentBattle: undefined,
  roundWinner: null,
  setSideSelection: () => {},
  drawCard: () => {},
  revealCard: () => {},
  setBattleResult: () => {},
  setRoundScore: () => {},
  goToNextRound: () => {},
};
