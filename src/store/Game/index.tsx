import { createContext, useState, useEffect, useCallback } from "react";
import {
  GameContextType,
  BattleResultType,
  GameSidesItemType,
  HandSidesType,
} from "@/types/game.types";
import { useQuery } from "@tanstack/react-query";
import { APIS } from "@/config/api";
import { HeroDataType } from "@/types/main.types";
import { sideOptions } from "@/config/game";
import {
  calculateSkills,
  calculateValues,
  // getDominantColor,
} from "@/helpers/hero";
import {
  uniqueNamesGenerator,
  adjectives,
  starWars,
} from "unique-names-generator";

const initState: GameContextType = {
  sides: {
    player: {
      name: "",
      type: null,
      score: 0,
      lastScore: null,
    },
    computer: {
      name: "",
      type: null,
      score: 0,
      lastScore: null,
    },
  },
  decks: {
    heroes: [],
    villains: [],
  },
  hands: {
    player: [],
    computer: [],
  },
  battles: {
    player: {},
    computer: {},
  },
  currentBattle: undefined,
  currentRound: 0,
  roundWinner: null,
  rounds: [
    {
      result: null,
      battles: [],
      isStarted: false,
      isEnded: false,
    },
  ],
  isGameOver: false,
  setSideSelection: () => {},
  drawCard: () => {},
  revealCard: () => {},
  setBattleResult: () => {},
  setRoundScore: () => {},
  goToNextRound: () => {},
  completeRound: () => {},
  startNewRound: () => {},
  startNewGame: () => {},
};

export const GameContext = createContext(initState);

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [sides, setSides] = useState(initState.sides);
  const [decks, setDecks] = useState(initState.decks);
  const [hands, setHands] = useState(initState.hands);
  const [currentBattle, setCurrentBattle] = useState(initState.currentBattle);
  const [battles, setBattles] = useState(initState.battles);
  const [roundWinner, setRoundWinner] = useState(initState.roundWinner);
  const [rounds, setRounds] = useState(initState.rounds);
  const [currentRound, setCurrentRound] = useState(initState.currentRound);
  const [isGameOver, setIsGameOver] = useState(initState.isGameOver);

  const { data } = useQuery({
    queryKey: ["hero-data"],
    queryFn: async () => {
      const response = await fetch(APIS.heroData);
      return await response.json();
    },
  });

  const setSideSelection = (data: GameSidesItemType) => {
    const computer = sideOptions.find((item) => item !== data.type);
    const computerName: string = uniqueNamesGenerator({
      dictionaries: [adjectives, starWars],
      style: "capital",
      separator: " ",
    });

    if (computer) {
      setSides({
        player: { ...data },
        computer: {
          name: computerName,
          type: computer,
          score: 0,
          lastScore: null,
        },
      });
    }
  };

  const drawCard = useCallback(() => {
    const player = sides.player.type;
    const computer = sides.computer.type;

    if (player && computer) {
      const playerCards = decks[player].filter((card) => !card?.used);
      const computerCards = decks[computer].filter((card) => !card?.used);

      // Decks not loaded yet (or used up): the effect retries when they change
      if (playerCards.length === 0 || computerCards.length === 0) {
        return;
      }

      const pPick = playerCards[Math.floor(Math.random() * playerCards.length)];
      const cPick =
        computerCards[Math.floor(Math.random() * computerCards.length)];
      const pSkills = calculateSkills(pPick.powerstats);
      const cSkills = calculateSkills(cPick.powerstats);
      const pCard = { ...pPick, skills: pSkills, values: calculateValues(pSkills) };
      const cCard = { ...cPick, skills: cSkills, values: calculateValues(cSkills) };
      const markUsed = (deck: HeroDataType[], id: HeroDataType["id"]) =>
        deck.map((card) => (card.id === id ? { ...card, used: true } : card));

      // Copy instead of mutating: deck cards must never be the query cache's
      // hero objects, or "used" would stick across games
      setDecks((prev) => ({
        ...prev,
        [player]: markUsed(prev[player], pPick.id),
        [computer]: markUsed(prev[computer], cPick.id),
      }));

      setHands((prev) => {
        return {
          player: [...prev.player, pCard],
          computer: [...prev.computer, cCard],
        };
      });
    }
  }, [decks, sides]);

  const revealCard = (index: number) => {
    setHands((prev) => {
      const newPHands = [...prev.player];
      const newPCard = { ...newPHands[index], revealed: true };
      const newCHands = [...prev.computer];
      const newCCard = { ...newCHands[index], revealed: true };

      newPHands[index] = newPCard;
      newCHands[index] = newCCard;

      return { player: newPHands, computer: newCHands };
    });
    setCurrentBattle(index);
  };

  const setBattleResult = (index: number) => {
    const pValues = hands.player[index].values;
    const cValues = hands.computer[index].values;
    let pResult: BattleResultType = "draw";
    let cResult: BattleResultType = "draw";
    const pIsDead = cValues.attack >= pValues.defense;
    const cIsDead = pValues.attack >= cValues.defense;

    if (pValues.attack >= cValues.defense && pValues.defense > cValues.attack) {
      pResult = "win";
      cResult = "lose";
    }

    if (cValues.attack >= pValues.defense && cValues.defense > pValues.attack) {
      pResult = "lose";
      cResult = "win";
    }

    setBattles((prev) => {
      const newResults = {
        player: { ...prev.player },
        computer: { ...prev.computer },
      };

      newResults.player[index] = {
        result: pResult,
        isEnded: true,
        isDead: pIsDead,
      };
      newResults.computer[index] = {
        result: cResult,
        isEnded: true,
        isDead: cIsDead,
      };

      return newResults;
    });
  };

  const setRoundScore = useCallback(() => {
    const playerScore = Object.keys(battles.player).reduce((acc, inx) => {
      if (battles.player[inx].result === "win") {
        return acc + 1;
      }
      return acc;
    }, 0);

    const computerScore = Object.keys(battles.computer).reduce((acc, inx) => {
      if (battles.computer[inx].result === "win") {
        return acc + 1;
      }
      return acc;
    }, 0);

    let winner: HandSidesType | "draw" = "draw";

    if (playerScore > computerScore) {
      winner = "player";
    } else if (computerScore > playerScore) {
      winner = "computer";
    }

    setRounds((prev) => {
      const newRounds = [...prev];
      const currentBattles = hands.player.map((hand, inx) => {
        let result: HandSidesType | "draw" = "draw";

        if (battles.player[inx].result === "win") {
          result = "player";
        } else if (battles.computer[inx].result === "win") {
          result = "computer";
        }

        return {
          winner: result,
          cards: {
            player: hand,
            computer: hands.computer[inx],
          },
        };
      });
      const newRound = {
        ...newRounds[currentRound],
        result: winner,
        battles: currentBattles,
        isEnded: true,
      };
      newRounds[currentRound] = newRound;

      return newRounds;
    });
    setSides((prev) => ({
      ...prev,
      player: { ...prev.player, lastScore: playerScore },
      computer: {
        ...prev.computer,
        lastScore: computerScore,
      },
    }));
  }, [battles, hands, currentRound]);

  const goToNextRound = () => {
    setHands(initState.hands);
    setBattles(initState.battles);
    setCurrentBattle(initState.currentBattle);
    setCurrentRound((prev) => prev + 1);
    setRounds((prev) => {
      const newRounds = [...prev];
      newRounds.push({
        result: null,
        battles: [],
        isStarted: false,
        isEnded: false,
      });

      return newRounds;
    });
    setRoundWinner(null);
  };

  const completeRound = () => {
    setRoundWinner((prev) => {
      if (prev === null) {
        return rounds[currentRound].result;
      }

      return prev;
    });
    setSides((prev) => {
      const newPlayerScore = prev.player.score + (prev.player.lastScore || 0);
      const newComputerScore =
        prev.computer.score + (prev.computer.lastScore || 0);

      return {
        ...prev,
        player: { ...prev.player, score: newPlayerScore, lastScore: null },
        computer: {
          ...prev.computer,
          score: newComputerScore,
          lastScore: null,
        },
      };
    });
    if (currentRound === 4) {
      setIsGameOver(true);
    }
  };

  const startNewRound = () => {
    setRounds((prev) => {
      const newRounds = [...prev];
      // Copy the round rather than mutate it: round 1 is the object from
      // initState, and mutating it would mark round 1 of every later game as
      // already started (so its RoundStartDialog would never open)
      newRounds[currentRound] = { ...newRounds[currentRound], isStarted: true };

      return newRounds;
    });
  };

  // Fresh copies per game so the cached hero data is never marked as used
  const prepareDecks = () => {
    const heroList = data
      .filter((hr: HeroDataType) => hr.biography.alignment === "good")
      .map((hr: HeroDataType) => ({ ...hr, used: false }));
    const villainList = data
      .filter((hr: HeroDataType) => hr.biography.alignment === "bad")
      .map((hr: HeroDataType) => ({ ...hr, used: false }));

    setDecks({ heroes: heroList, villains: villainList });
  };

  // keepSides: rematch with the same names and sides; otherwise the sides are
  // cleared and Gameplay sends the player back to side selection
  const startNewGame = (keepSides = false) => {
    setSides((prev) => {
      const playerSide = {
        ...initState.sides.player,
        name: prev.player.name,
        type: keepSides ? prev.player.type : initState.sides.player.type,
      };
      const computerSide = {
        ...initState.sides.computer,
        name: prev.computer.name,
        type: keepSides ? prev.computer.type : initState.sides.computer.type,
      };

      return { player: playerSide, computer: computerSide };
    });
    prepareDecks();
    setHands(initState.hands);
    setCurrentBattle(initState.currentBattle);
    setBattles(initState.battles);
    setRoundWinner(initState.roundWinner);
    setRounds(initState.rounds);
    setCurrentRound(initState.currentRound);
    setIsGameOver(initState.isGameOver);
  };

  useEffect(() => {
    const batLen = Object.keys(battles.player).length;
    if (batLen === 5) {
      setRoundScore();
    }
  }, [battles.player, setRoundScore]);

  useEffect(() => {
    if (
      hands.player.length < 5 &&
      sides.player.type !== null &&
      roundWinner === null &&
      rounds[currentRound].isStarted
    ) {
      drawCard();
    }
  }, [
    sides.player.type,
    hands.player,
    drawCard,
    rounds,
    currentRound,
    roundWinner,
  ]);

  useEffect(() => {
    if (data) {
      prepareDecks();
    }
  }, [data]);

  return (
    <GameContext.Provider
      value={{
        sides,
        decks,
        hands,
        battles,
        currentBattle,
        currentRound,
        roundWinner,
        rounds,
        isGameOver,
        setSideSelection,
        drawCard,
        revealCard,
        setBattleResult,
        setRoundScore,
        goToNextRound,
        completeRound,
        startNewRound,
        startNewGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
