import { createContext, useState, useEffect, useCallback } from "react";
import {
  GameContextType,
  BattleResultType,
  GameSidesItemType,
  HandSidesType,
} from "../../types/game.types";
import { useQuery } from "@tanstack/react-query";
import { APIS } from "../../config/api";
import { HeroDataType } from "../../types/main.types";
import { sideOptions } from "../../config/game";
import {
  calculateSkills,
  calculateValues,
  // getDominantColor,
} from "../../helpers/hero";
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
    },
    computer: {
      name: "",
      type: null,
      score: 0,
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
  roundWinner: null,
  setSideSelection: () => {},
  drawCard: () => {},
  revealCard: () => {},
  setBattleResult: () => {},
  setRoundScore: () => {},
  goToNextRound: () => {},
};

export const GameContext = createContext(initState);

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [sides, setSides] = useState(initState.sides);
  const [decks, setDecks] = useState(initState.decks);
  const [hands, setHands] = useState(initState.hands);
  const [currentBattle, setCurrentBattle] = useState(initState.currentBattle);
  const [battles, setBattles] = useState(initState.battles);
  const [roundWinner, setRoundWinner] = useState(initState.roundWinner);

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
      const pInx = Math.floor(Math.random() * playerCards.length);
      const cInx = Math.floor(Math.random() * computerCards.length);
      const pID = playerCards[pInx].id;
      const cID = computerCards[cInx].id;
      const pdInx = decks[player].findIndex((c) => c.id === pID);
      const cdInx = decks[computer].findIndex((c) => c.id === cID);

      setDecks((prev) => {
        const newDecks = {
          heroes: [...prev.heroes],
          villains: [...prev.villains],
        };
        newDecks[player][pdInx].used = true;
        newDecks[computer][cdInx].used = true;

        return newDecks;
      });

      playerCards[pInx].skills = calculateSkills(playerCards[pInx].powerstats);
      playerCards[pInx].values = calculateValues(playerCards[pInx].skills);
      computerCards[cInx].skills = calculateSkills(
        computerCards[cInx].powerstats
      );
      computerCards[cInx].values = calculateValues(computerCards[cInx].skills);

      // getDominantColor(playerCards[pInx].images.xs)
      //   .then((color) => {
      //     if(color){
      //       const bgColor = color as string;
      //       playerCards[pInx].bgColor = bgColor;
      //     }
      //   })
      //   .catch((err) => console.error(err));

      setHands((prev) => {
        return {
          player: [...prev.player, ...[playerCards[pInx]]],
          computer: [...prev.computer, ...[computerCards[cInx]]],
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

      newResults.player[index] = { result: pResult, isEnded: true };
      newResults.computer[index] = { result: cResult, isEnded: true };

      return newResults;
    });
  };

  // const prepareRound = () => {
  //   let count = 0;

  //   while (count < 5) {
  //     drawCard();
  //     count++;
  //   }
  // };

  const setRoundScore = useCallback(() => {
    console.log(battles);
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

    setRoundWinner(winner);
    setSides((prev) => ({
      ...prev,
      player: { ...prev.player, score: prev.player.score + playerScore },
      computer: {
        ...prev.computer,
        score: prev.computer.score + computerScore,
      },
    }));
  }, [battles]);

  const goToNextRound = () => {
    setHands(initState.hands);
    setBattles(initState.battles);
    setCurrentBattle(initState.currentBattle);
    setRoundWinner(null);
  };

  useEffect(() => {
    const batLen = Object.keys(battles.player).length;
    if (batLen === 5) {
      setRoundScore();
    }
  }, [battles.player, setRoundScore]);

  useEffect(() => {
    if (hands.player.length < 5) {
      drawCard();
    }
  }, [hands.player, drawCard]);

  useEffect(() => {
    if (sides.player.type !== null && roundWinner === null) {
      drawCard();
    }
  }, [sides.player.type, roundWinner]);

  useEffect(() => {
    if (data) {
      const heroList = data.filter(
        (hr: HeroDataType) => hr.biography.alignment === "good"
      );
      const villainList = data.filter(
        (hr: HeroDataType) => hr.biography.alignment === "bad"
      );

      setDecks({ heroes: heroList, villains: villainList });
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
        roundWinner,
        setSideSelection,
        drawCard,
        revealCard,
        setBattleResult,
        setRoundScore,
        goToNextRound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
