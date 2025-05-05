import { styled, Box, Stack, Typography, ButtonBase } from "@mui/material";
import { TITLE_STYLE, YELLOW, HEADER_HEIGHT } from "../../../config/general";
import CloseIcon from "@mui/icons-material/Close";

export const GameSummaryBody = styled(Stack)(({ theme }) => ({
  position: "relative",
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    height: `calc(100dvh - ${HEADER_HEIGHT.lg}px)`,
  },
  [theme.breakpoints.down("lg")]: {
    height: `calc(100dvh - ${HEADER_HEIGHT.sm}px)`,
  },
  overflow: "hidden",
}));

export const GameSummaryHeader = ({
  title,
  onClose,
  size,
}: {
  title: string;
  onClose: () => void;
  size: "sm" | "lg";
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        paddingInline: "20px",
        height: `${HEADER_HEIGHT[size]}px`,
        background: YELLOW,
        position: "relative",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: size === "sm" ? "18px" : "24px", ...TITLE_STYLE }}
      >
        {title}
      </Typography>
      <ButtonBase
        aria-label="Close"
        onClick={onClose}
        sx={{ position: "absolute", top: "calc(50% - 12px)", right: "20px" }}
      >
        <CloseIcon fontSize="small" />
      </ButtonBase>
    </Stack>
  );
};

export const GameSummaryBoards = ({
  computerBoard,
  playerBoard,
  isMobile,
}: {
  computerBoard: React.ReactNode;
  playerBoard: React.ReactNode;
  isMobile: boolean;
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        paddingInline: isMobile ? 0 : "20px",
        marginBottom: isMobile ? "10px" : "20px",
      }}
    >
      <Box sx={{ flex: 1, maxWidth: "45%" }}>{computerBoard}</Box>
      <Box sx={{ flex: 1, maxWidth: "45%" }}>{playerBoard}</Box>
    </Stack>
  );
};
