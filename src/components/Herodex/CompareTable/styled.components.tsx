import { Box } from "@mui/material";
import {
  EB_BG,
  EB_BORDER,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_LABEL_FONT,
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

const CELL_STYLE = {
  padding: "12px 10px",
  textAlign: "right",
  borderBottom: `1px solid ${EB_BORDER}`,
} as const;

export const TableScroller = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ overflowX: "auto" }}>{children}</Box>
);

export const Table = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="table"
    sx={{
      width: "100%",
      borderCollapse: "collapse",
      "& td:first-of-type, & th:first-of-type": { textAlign: "left" },
      "& thead td": { borderBottom: `1px solid ${EB_BORDER}` },
    }}
  >
    {children}
  </Box>
);

export const ColumnHeader = ({
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
      ...CELL_STYLE,
      fontFamily: EB_LABEL_FONT,
      fontWeight: 700,
      fontSize: "15px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: EB_TEXT_MUTED,
      whiteSpace: "nowrap",
    }}
  >
    <Box
      component="span"
      aria-hidden="true"
      sx={{
        display: "inline-block",
        width: "10px",
        height: "10px",
        borderRadius: "999px",
        marginRight: "6px",
        background: color,
      }}
    />
    {name}
  </Box>
);

export const RowLabel = ({
  bold = false,
  children,
}: {
  bold?: boolean;
  children: React.ReactNode;
}) => (
  <Box
    component="th"
    scope="row"
    sx={{
      ...CELL_STYLE,
      fontSize: "16px",
      fontWeight: bold ? 600 : 400,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </Box>
);

export const ValueCell = ({
  value,
  best,
}: {
  value: number;
  best: boolean;
}) => (
  <Box
    component="td"
    data-best={best || undefined}
    sx={{
      ...CELL_STYLE,
      fontFamily: EB_DISPLAY_FONT,
      fontSize: "20px",
      color: best ? EB_BG : EB_TEXT_SUBTLE,
    }}
  >
    <Box
      component="span"
      sx={
        best
          ? { background: EB_GOLD, borderRadius: "8px", padding: "2px 8px" }
          : undefined
      }
    >
      {value}
    </Box>
    {best && (
      <Box component="span" sx={VISUALLY_HIDDEN}>
        {" "}
        (highest)
      </Box>
    )}
  </Box>
);

export const NoColumns = () => (
  <Box
    component="p"
    sx={{ margin: 0, padding: "24px 0", color: EB_TEXT_SUBTLE }}
  >
    Every character is hidden. Show one to see its numbers.
  </Box>
);
