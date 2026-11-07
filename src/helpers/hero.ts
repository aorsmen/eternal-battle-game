import {
  PowerStatType,
  SkillsType,
  HeroValuesType,
  HeroDataType,
  RosterHeroType,
} from "@/types/main.types";
import {
  APPEARANCE_COLORS,
  COMPARE_LIMIT,
  heroSkillModel,
} from "@/config/hero";

export const calculateSkills = (stats: PowerStatType): SkillsType => {
  const { intelligence, combat, strength, power, durability, speed } = stats;
  const attackPower = Math.round((strength + combat + power) / 3);
  const acuracy = Math.round((intelligence * combat) / 100);
  const defenseRating = Math.round((durability + combat + speed) / 3);
  const evasion = Math.round((speed + combat + intelligence) / 3);
  const attackSpeed = Math.round((speed + power + combat) / 3);
  const survival = Math.round((durability + intelligence + combat) / 3);

  return {
    ...heroSkillModel,
    attackPower,
    acuracy,
    attackSpeed,
    defenseRating,
    evasion,
    survival,
  };
};

export const calculateValues = (skills: SkillsType): HeroValuesType => {
  const {
    attackPower,
    attackSpeed,
    acuracy,
    defenseRating,
    survival,
    evasion,
  } = skills;
  const attack = Math.round(
    ((attackPower + attackSpeed) / 20) * (acuracy / 100)
  );
  const defense = Math.round(
    ((defenseRating + evasion) / 20) * (survival / 100)
  );

  return { attack, defense };
};

export const getDominantColor = (imageUrl: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const colorCounts: { [key in string]: number } = {};
        let maxCount = 0;
        let dominantColor = "#000000";

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const color = `rgb(${r},${g},${b})`;

          colorCounts[color] = (colorCounts[color] || 0) + 1;
          if (colorCounts[color] > maxCount) {
            maxCount = colorCounts[color];
            dominantColor = color;
          }
        }

        resolve(dominantColor);
      }
    };

    img.onerror = () => reject(new Error("Failed to load image"));
  });
};

// Short role line for cards: occupation, or the side when none is listed
export const getHeroRole = ({
  work,
  biography,
}: Pick<HeroDataType, "work" | "biography">) =>
  work.occupation && work.occupation !== "-"
    ? work.occupation
    : biography.alignment === "good"
      ? "Hero"
      : "Villain";

// The data uses "-", "", null or "0 cm" style values for unknown fields
export const isUnknownValue = (value?: string | null) =>
  value === undefined ||
  value === null ||
  value.trim() === "" ||
  value.trim() === "-" ||
  /^0(\.0+)?\s/.test(value.trim());

export const getCompareLink = (ids: string[]) =>
  `/herodex/compare?ids=${ids.join(",")}`;

// "1,203 cm" -> { value: "1,203", unit: "cm", amount: 1203 }
export const parseMeasurement = (text?: string | null) => {
  if (isUnknownValue(text)) return null;

  const match = (text as string).trim().match(/^([\d.,]+)\s*(.*)$/);
  if (!match) return null;

  const amount = Number(match[1].replace(/,/g, ""));
  if (!amount) return null;

  return { value: match[1], unit: match[2], amount };
};

// Height in cm, so it can be drawn next to the reference figure
export const toCentimeters = (amount: number, unit: string) => {
  if (unit === "cm") return amount;
  if (unit.startsWith("meter")) return amount * 100;
  return null;
};

// "Brown / White" -> a two-tone swatch; unknown names give null
export const getColorSwatch = (name?: string | null) => {
  if (isUnknownValue(name)) return null;

  const colors = (name as string)
    .toLowerCase()
    .replace(/\(.*\)/g, "")
    .split("/")
    .map((part) => APPEARANCE_COLORS[part.trim()])
    .filter(Boolean);

  if (colors.length === 0) return null;
  if (colors.length === 1) return colors[0];
  return `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
};

// Reads the `ids` query value from a compare link: no duplicates, at most
// COMPARE_LIMIT
export const parseCompareIds = (value?: string | null) =>
  Array.from(
    new Set(
      (value ?? "")
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    )
  ).slice(0, COMPARE_LIMIT);

export type MatchupResultType = "win" | "lose" | "draw";

// Same rule as the card game: a card wins when its attack reaches the
// opponent's defence and its defence stays above the opponent's attack
export const getMatchup = (
  card: HeroValuesType,
  opponent: HeroValuesType
): MatchupResultType => {
  if (card.attack >= opponent.defense && card.defense > opponent.attack)
    return "win";
  if (opponent.attack >= card.defense && opponent.defense > card.attack)
    return "lose";
  return "draw";
};

// Search text against a character's name, role and aliases
export const matchesRosterSearch = (
  hero: Pick<RosterHeroType, "name" | "role" | "aliases">,
  search: string
) => {
  const text = search.trim().toLowerCase();
  return (
    !text ||
    [hero.name, hero.role, ...hero.aliases].some((value) =>
      value.toLowerCase().includes(text)
    )
  );
};
