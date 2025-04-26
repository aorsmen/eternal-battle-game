import { styled, Box, Stack, Typography, ButtonBase } from "@mui/material";
import { TITLE_STYLE, YELLOW, BG_COLOR } from "../../../config/general";
import CloseIcon from "@mui/icons-material/Close";
import { RefObject } from "react";

export const GameSummaryBody = styled(Stack)({
  position: "relative",
  width: "100%",
  height: "calc(100% - 64px)",
  overflow: "hidden",
});

export const GameSummaryHeader = ({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        paddingInline: "20px",
        height: "64px",
        background: YELLOW,
        position: "relative",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "24px", ...TITLE_STYLE }}>
        {title}
      </Typography>
      <ButtonBase
        aria-label="Close"
        onClick={onClose}
        sx={{ position: "absolute", top: "calc(50% - 12px)", right: "20px" }}
      >
        <CloseIcon />
      </ButtonBase>
    </Stack>
  );
};

export const GameSummaryBoards = ({
  computerBoard,
  playerBoard,
}: {
  computerBoard: React.ReactNode;
  playerBoard: React.ReactNode;
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ paddingInline: "20px", marginBottom: "20px" }}
    >
      <Box sx={{ flex: 1, maxWidth: "45%" }}>{computerBoard}</Box>
      <Box sx={{ flex: 1, maxWidth: "45%" }}>{playerBoard}</Box>
    </Stack>
  );
};

export const RoundWrapper = ({
  index,
  active,
  children,
}: {
  index: number;
  active: number;
  children: React.ReactNode;
}) => {
  return (
    <Box
      className={`round-wrapper${index === active ? " active" : ""}`}
      sx={{
        zIndex: index,
        position: "relative",
      }}
    >
      <Box
        sx={{
          marginBottom: "10px",
          height: "30px",
        }}
      >
        <Typography
          sx={{
            ...TITLE_STYLE,
            color: YELLOW,
            fontSize: "18px",
            background: BG_COLOR,
          }}
          className="round-title"
        >{`Round ${index + 1}`}</Typography>
      </Box>
      <Stack direction="row" spacing={1} className="round-cards">
        {children}
      </Stack>
    </Box>
  );
};

export const RoundsScoller = ({
  ref,
  children,
}: {
  ref: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) => {
  return (
    <Box
      ref={ref}
      sx={{
        overflowX: "auto",
        overflowY: "hidden",
        height: "810px",
        scrollBehavior: "smooth",
        paddingInline: "20px",
        scrollbarColor: `${YELLOW} ${BG_COLOR}`,
        scrollbarWidth: "thin",
      }}
    >
      <Stack
        direction="row"
        spacing={5}
        sx={{
          height: "100%",
          "& .active .round-title": { left: "20px", position: "fixed" },
        }}
      >
        {children}
      </Stack>
    </Box>
  );
};
