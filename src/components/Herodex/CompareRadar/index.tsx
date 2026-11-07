import { CompareSeriesType } from "@/types/main.types";
import {
  EB_BODY_FONT,
  EB_BORDER,
  EB_SLOT_BORDER,
  EB_TEXT_MUTED,
  EB_TEXT_PLACEHOLDER,
} from "@/config/general";

const WIDTH = 460;
const HEIGHT = 430;
const CX = 230;
const CY = 215;
const RADIUS = 150;
const RINGS = [25, 50, 75, 100];
const LABEL_GAP = 16;

const angle = (index: number, count: number) =>
  -Math.PI / 2 + (index * 2 * Math.PI) / count;

// Values are 0–100; anything above sits on the outer ring
const point = (value: number, index: number, count: number) => {
  const scale = (RADIUS * Math.min(Math.max(value, 0), 100)) / 100;
  const a = angle(index, count);
  return {
    x: CX + scale * Math.cos(a),
    y: CY + scale * Math.sin(a),
  };
};

const toPoints = (values: number[]) =>
  values
    .map((value, index) => {
      const { x, y } = point(value, index, values.length);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

const labelPosition = (
  index: number,
  count: number
): { x: number; y: number; anchor: "start" | "middle" | "end" } => {
  const cos = Math.cos(angle(index, count));
  const sin = Math.sin(angle(index, count));
  const offset = sin < -0.5 ? -4 : sin > 0.5 ? 16 : 5;

  return {
    x: CX + (RADIUS + LABEL_GAP) * cos,
    y: CY + (RADIUS + LABEL_GAP) * sin + offset,
    anchor: cos > 0.2 ? "start" : cos < -0.2 ? "end" : "middle",
  };
};

// Radar chart for up to four characters; `series` holds only the ones shown
const CompareRadar = ({
  labels,
  series,
  title,
}: {
  labels: string[];
  series: CompareSeriesType[];
  title: string;
}) => {
  const count = labels.length;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      role="img"
      aria-label={title}
      style={{ maxWidth: "560px", alignSelf: "center", overflow: "visible" }}
    >
      {RINGS.map((ring) => (
        <polygon
          key={ring}
          points={toPoints(labels.map(() => ring))}
          fill="none"
          stroke={ring === 100 ? EB_SLOT_BORDER : EB_BORDER}
          strokeWidth={ring === 100 ? 1.5 : 1}
        />
      ))}
      {labels.map((label, index) => {
        const end = point(100, index, count);
        return (
          <line
            key={label}
            x1={CX}
            y1={CY}
            x2={end.x.toFixed(1)}
            y2={end.y.toFixed(1)}
            stroke={EB_BORDER}
          />
        );
      })}
      {RINGS.slice(0, -1).map((ring) => (
        <text
          key={ring}
          x={CX + 6}
          y={(CY - (RADIUS * ring) / 100 + 4).toFixed(1)}
          fill={EB_TEXT_PLACEHOLDER}
          fontSize="11"
          fontFamily={EB_BODY_FONT}
        >
          {ring}
        </text>
      ))}
      {series.map((item) => (
        <polygon
          key={item.id}
          data-testid={`radar-series-${item.id}`}
          points={toPoints(item.values)}
          fill={item.color}
          fillOpacity="0.16"
          stroke={item.color}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      ))}
      {labels.map((label, index) => {
        const { x, y, anchor } = labelPosition(index, count);
        return (
          <text
            key={label}
            x={x.toFixed(1)}
            y={y.toFixed(1)}
            textAnchor={anchor}
            fill={EB_TEXT_MUTED}
            fontSize="15"
            fontFamily={EB_BODY_FONT}
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};

export default CompareRadar;
