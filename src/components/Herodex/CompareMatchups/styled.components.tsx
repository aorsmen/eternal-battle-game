import { Box } from "@mui/material";
import { MatchupResultType } from "@/helpers/hero";
import {
  EB_BG,
  EB_BORDER,
  EB_BORDER_STRONG,
  EB_GOLD,
  EB_LABEL_FONT,
  EB_SLOT_BORDER,
  EB_TEXT_MUTED,
  EB_TEXT_SUBTLE,
} from "@/config/general";

const VISUALLY_HIDDEN = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;

const LABEL_TEXT = {
  fontFamily: EB_LABEL_FONT,
  fontWeight: 700,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
} as const;

const RESULTS: {
  [key in MatchupResultType]: { text: string; sx: object };
} = {
  win: { text: "Wins", sx: { background: EB_GOLD, color: EB_BG } },
  lose: { text: "Loses", sx: { background: EB_BORDER, color: EB_TEXT_SUBTLE } },
  draw: {
    text: "Draw",
    sx: { border: `2px solid ${EB_SLOT_BORDER}`, color: EB_TEXT_MUTED },
  },
};

export const MatchupScroller = ({
  children,
}: {
  children: React.ReactNode;
}) => <Box sx={{ overflowX: "auto" }}>{children}</Box>;

export const MatchupTable = ({
  columns,
  children,
}: {
  columns: number;
  children: React.ReactNode;
}) => (
  <Box
    component="table"
    sx={{
      width: "100%",
      minWidth: `${180 + columns * 120}px`,
      borderCollapse: "separate",
      borderSpacing: "8px",
      tableLayout: "fixed",
      margin: "-8px",
      "& thead td": { width: "180px" },
    }}
  >
    {children}
  </Box>
);

export const OpponentHeader = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => (
  <Box
    component="th"
    scope="col"
    sx={{
      ...LABEL_TEXT,
      fontSize: "15px",
      letterSpacing: "0.06em",
      color: EB_TEXT_MUTED,
      textAlign: "center",
      paddingBottom: "6px",
      borderBottom: `3px solid ${color}`,
    }}
  >
    vs {name}
  </Box>
);

export const CardLabel = ({ name, color }: { name: string; color: string }) => (
  <Box
    component="th"
    scope="row"
    sx={{
      ...LABEL_TEXT,
      fontSize: "17px",
      letterSpacing: "0.03em",
      color,
      textAlign: "left",
    }}
  >
    {name}
  </Box>
);

const RESULT_PILL = {
  ...LABEL_TEXT,
  height: "40px",
  boxSizing: "border-box",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "15px",
  letterSpacing: "0.08em",
} as const;

export const ResultCell = ({ result }: { result: MatchupResultType }) => (
  <Box component="td" sx={{ padding: 0 }}>
    <Box sx={{ ...RESULT_PILL, ...RESULTS[result].sx }}>
      {RESULTS[result].text}
    </Box>
  </Box>
);

export const SameCardCell = () => (
  <Box component="td" sx={{ padding: 0 }}>
    <Box sx={{ ...RESULT_PILL, color: EB_BORDER_STRONG }}>
      <span aria-hidden="true">—</span>
      <Box component="span" sx={VISUALLY_HIDDEN}>
        Same card
      </Box>
    </Box>
  </Box>
);
