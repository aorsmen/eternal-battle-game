import { GameContextType } from "../types/game.types";
import { HeroDataType, MainContextType } from "../types/main.types";

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

export const TEST_HERO_DATA_2: HeroDataType = {
  id: "106",
  name: "Black Panther",
  slug: "106-black-panther",
  powerstats: {
    intelligence: 88,
    strength: 16,
    speed: 30,
    durability: 60,
    power: 41,
    combat: 100,
  },
  skills: {
    attackPower: 52,
    acuracy: 88,
    attackSpeed: 57,
    defenseRating: 63,
    evasion: 73,
    survival: 83,
  },
  appearance: {
    gender: "Male",
    race: "Human",
    height: ["6'0", "183 cm"],
    weight: ["200 lb", "90 kg"],
    eyeColor: "Brown",
    hairColor: "Black",
  },
  biography: {
    fullName: "T'Challa",
    alterEgos: "No alter egos found.",
    aliases: [
      "Mr. Okonkwo",
      "The Man Without Fear",
      "Luke Charles",
      "Black Leopard",
      "the Client",
      "Coal Tiger",
      "has impersonated Daredevil and others on occasion",
    ],
    placeOfBirth: "Wakanda, Africa",
    firstAppearance: "Fantastic Four Vol. 1 #52 (1966)",
    publisher: "Marvel Comics",
    alignment: "good",
  },
  work: {
    occupation:
      "King and Chieftain of Wakanda, scientist; former school teacher",
    base: "Wakanda, Mobile",
  },
  connections: {
    groupAffiliation:
      "Formerly Fantastic Four, Secret Avengers, Avengers, Pendragons, Queen's Vengeance, former Fantastic Force financier",
    relatives:
      "Bashenga (paternal ancestor, deceased), Azzuri the Wise (paternal grandfather, deceased), Nanali (paternal grandmother, deceased), Chanda (paternal grandfather, presumably deceased), T?Chaka (father, deceased), S'Yan (uncle, deceased), N?Yami (mother, deceased), Ramonda (stepmother), Hunter (adopted brother), Jakarra (half-brother), Shuri (sister), Ororo Munroe (wife), Joshua Itobo, Ishanta, Zuni, M'Koni, T'Shan (cousins), Wheeler (cousin by marriage, deceased), Billy Wheeler (1st cousin once removed)",
  },
  images: {
    xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/106-black-panther.jpg",
    sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/106-black-panther.jpg",
    md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/106-black-panther.jpg",
    lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/106-black-panther.jpg",
  },
  values: {
    attack: 5,
    defense: 6,
  },
};

export const TEST_GAME_CONTEXT: GameContextType = {
  sides: {
    player: {
      name: "test user 1",
      type: "heroes",
      score: 0,
      lastScore: 0,
    },
    computer: {
      name: "test user 2",
      type: "villains",
      score: 0,
      lastScore: 0,
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
  currentRound: 0,
  roundWinner: null,
  rounds: [],
  isGameOver: false,
  setSideSelection: () => {},
  drawCard: () => {},
  revealCard: () => {},
  setBattleResult: () => {},
  setRoundScore: () => {},
  goToNextRound: () => {},
  completeRound: () => {},
  startNewRound: () => {},
};

export const TEST_HERO_NODE_DATA = {
  id: TEST_HERO_DATA.id,
  data: {
    label: TEST_HERO_DATA.name,
    details: TEST_HERO_DATA,
  },
  type: "heroNode",
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
  selected: false,
  selectable: true,
  draggable: true,
  deletable: true,
  isConnectable: true,
  dragging: false,
  zIndex: 0,
  width: 270,
  height: 370,
};

export const TEST_MAIN_CONTEXT: MainContextType = {
  nodes: [],
  edges: [],
  heroesData: [TEST_HERO_DATA],
  heroesIsLoading: false,
  nodeDetails: "",
  compareList: [],
  onNodesChange: () => {},
  onEdgesChange: () => {},
  setReactFlowInstance: () => {},
  setNodes: () => {},
  setEdges: () => {},
  addHero: () => {},
  removeHero: () => {},
  setNodeDetails: () => {},
  getHeroById: () => null,
  setCompare: () => {},
};

export const TEST_END_GAME_ROUNDS = [
  {
    result: null,
    battles: [],
    isStarted: true,
    isEnded: true,
  },
  {
    result: null,
    battles: [],
    isStarted: true,
    isEnded: true,
  },
  {
    result: null,
    battles: [],
    isStarted: true,
    isEnded: true,
  },
  {
    result: null,
    battles: [],
    isStarted: true,
    isEnded: true,
  },
  {
    result: null,
    battles: [],
    isStarted: true,
    isEnded: true,
  },
];
