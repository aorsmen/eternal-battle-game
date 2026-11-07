import { HeroValuesType } from "@/types/main.types";
import { getMatchup } from "@/helpers/hero";
import {
  MatchupScroller,
  MatchupTable,
  OpponentHeader,
  CardLabel,
  ResultCell,
  SameCardCell,
} from "./styled.components";

type MatchupCardType = {
  id: string;
  name: string;
  color: string;
  values: HeroValuesType;
};

// Each row is one card against every other card, using the game's rule
const CompareMatchups = ({ cards }: { cards: MatchupCardType[] }) => {
  return (
    <MatchupScroller>
      <MatchupTable columns={cards.length}>
        <thead>
          <tr>
            <td />
            {cards.map((card) => (
              <OpponentHeader
                key={card.id}
                name={card.name}
                color={card.color}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <CardLabel name={card.name} color={card.color} />
              {cards.map((opponent) =>
                opponent.id === card.id ? (
                  <SameCardCell key={opponent.id} />
                ) : (
                  <ResultCell
                    key={opponent.id}
                    result={getMatchup(card.values, opponent.values)}
                  />
                )
              )}
            </tr>
          ))}
        </tbody>
      </MatchupTable>
    </MatchupScroller>
  );
};

export default CompareMatchups;
