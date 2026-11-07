import { HeroDataType } from "@/types/main.types";
import { REFERENCE_HEIGHT_CM } from "@/config/hero";
import {
  getColorSwatch,
  isUnknownValue,
  parseMeasurement,
  toCentimeters,
} from "@/helpers/hero";
import {
  EB_HERO,
  EB_HERO_LIGHT,
  EB_SLOT_BORDER,
  EB_TEXT_SUBTLE,
  EB_VILLAIN,
  EB_VILLAIN_LIGHT,
} from "@/config/general";
import { PanelGrid } from "@/components/Herodex/CharacterSection/styled.components";
import {
  PanelStack,
  TextTile,
  ColorTile,
  MeasureTile,
  FigureRow,
  FigureWithCaption,
  HeightIcon,
  WeightIcon,
} from "./styled.components";

const REFERENCE_FIGURE_PX = 152;
const MIN_FIGURE_PX = 24;
const MAX_FIGURE_PX = 240;

const knownOrNull = (text?: string | null) =>
  isUnknownValue(text) ? null : (text as string);

// Figure height in px, scaled against the 6 ft reference and kept on screen
const toFigureHeight = (cm: number) =>
  Math.min(
    Math.max(
      Math.round((REFERENCE_FIGURE_PX * cm) / REFERENCE_HEIGHT_CM),
      MIN_FIGURE_PX
    ),
    MAX_FIGURE_PX
  );

const CharacterAppearance = ({ hero }: { hero: HeroDataType }) => {
  const { race, gender, hairColor, eyeColor, height, weight } = hero.appearance;
  const isHero = hero.biography.alignment === "good";
  const heightMeasure = parseMeasurement(height?.[1]);
  const weightMeasure = parseMeasurement(weight?.[1]);
  const heightCm = heightMeasure
    ? toCentimeters(heightMeasure.amount, heightMeasure.unit)
    : null;

  return (
    <PanelStack>
      <PanelGrid minWidth={240} gap={16}>
        <TextTile label="Race" text={knownOrNull(race)} />
        <TextTile label="Gender" text={knownOrNull(gender)} />
        <ColorTile
          label="Hair colour"
          text={knownOrNull(hairColor)}
          swatch={getColorSwatch(hairColor)}
        />
        <ColorTile
          label="Eye colour"
          text={knownOrNull(eyeColor)}
          swatch={getColorSwatch(eyeColor)}
        />
      </PanelGrid>
      <PanelGrid minWidth={320} gap={16}>
        <MeasureTile
          label="Height"
          icon={<HeightIcon />}
          value={heightMeasure?.value ?? null}
          unit={heightMeasure?.unit}
          alt={heightMeasure ? knownOrNull(height?.[0]) : null}
        >
          {heightMeasure && heightCm && (
            <FigureRow
              label={`${hero.name} at ${heightMeasure.value} ${heightMeasure.unit} next to a ${REFERENCE_HEIGHT_CM} cm (6 ft) reference figure`}
            >
              <FigureWithCaption
                height={REFERENCE_FIGURE_PX}
                color={EB_SLOT_BORDER}
                caption="6 ft"
                captionColor={EB_TEXT_SUBTLE}
              />
              <FigureWithCaption
                height={toFigureHeight(heightCm)}
                color={isHero ? EB_HERO : EB_VILLAIN}
                caption={hero.name}
                captionColor={isHero ? EB_HERO_LIGHT : EB_VILLAIN_LIGHT}
                bold
              />
            </FigureRow>
          )}
        </MeasureTile>
        <MeasureTile
          label="Weight"
          icon={<WeightIcon />}
          value={weightMeasure?.value ?? null}
          unit={weightMeasure?.unit}
          alt={weightMeasure ? knownOrNull(weight?.[0]) : null}
        />
      </PanelGrid>
    </PanelStack>
  );
};

export default CharacterAppearance;
