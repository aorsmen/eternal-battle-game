import { Box } from "@mui/material";
import { HeroDataType } from "@/types/main.types";
import {
  EB_LABEL_FONT,
  EB_DISPLAY_FONT,
  EB_SURFACE,
  EB_TEXT_SUBTLE,
} from "@/config/general";

const ROW_COLUMNS = {
  xs: "minmax(0, 1fr) 96px minmax(0, 1fr)",
  sm: "minmax(0, 1fr) 150px minmax(0, 1fr)",
};

export const RowsHeader = ({
  left,
  right,
}: {
  left: { label: string; color: string };
  right: { label: string; color: string };
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: ROW_COLUMNS,
        gap: { xs: "8px", sm: "16px" },
        paddingInline: { xs: "12px", sm: "18px" },
        fontFamily: EB_LABEL_FONT,
        fontWeight: 700,
        fontSize: { xs: "12px", sm: "14px" },
        letterSpacing: "0.16em",
        color: EB_TEXT_SUBTLE,
        textTransform: "uppercase",
      }}
    >
      <Box component="span" sx={{ color: left.color }}>
        {left.label}
      </Box>
      <Box component="span" sx={{ textAlign: "center" }}>
        Result
      </Box>
      <Box component="span" sx={{ textAlign: "right", color: right.color }}>
        {right.label}
      </Box>
    </Box>
  );
};

const Fighter = ({
  card,
  color,
  isLoser,
  alignEnd,
}: {
  card: HeroDataType;
  color: string;
  isLoser: boolean;
  alignEnd?: boolean;
}) => {
  const stat = (label: string, value: number) => (
    <Box component="span">
      <Box
        component="em"
        sx={{
          fontStyle: "normal",
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: { xs: "10px", sm: "12px" },
          letterSpacing: "0.1em",
          color: EB_TEXT_SUBTLE,
          marginRight: "4px",
        }}
      >
        {label}
      </Box>
      {value}
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: alignEnd ? "flex-end" : "flex-start",
        textAlign: alignEnd ? "right" : "left",
        gap: "2px",
        minWidth: 0,
        opacity: isLoser ? 0.45 : 1,
      }}
    >
      <Box
        component="b"
        title={card.name}
        sx={{
          maxWidth: "100%",
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: { xs: "15px", sm: "22px" },
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color,
        }}
      >
        {card.name}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          fontFamily: EB_DISPLAY_FONT,
          fontSize: { xs: "17px", sm: "24px" },
          lineHeight: 1,
        }}
      >
        {stat("ATK", card.values.attack)}
        {stat("DEF", card.values.defense)}
      </Box>
    </Box>
  );
};

export const BattleRow = ({
  left,
  right,
  result,
}: {
  left: { card: HeroDataType; color: string; isLoser: boolean };
  right: { card: HeroDataType; color: string; isLoser: boolean };
  result: React.ReactNode;
}) => {
  return (
    <Box
      data-testid="round-summary-row"
      sx={{
        display: "grid",
        gridTemplateColumns: ROW_COLUMNS,
        gap: { xs: "8px", sm: "16px" },
        alignItems: "center",
        padding: { xs: "10px 12px", sm: "14px 18px" },
        borderRadius: "14px",
        backgroundColor: EB_SURFACE,
      }}
    >
      <Fighter {...left} />
      {result}
      <Fighter {...right} alignEnd />
    </Box>
  );
};
