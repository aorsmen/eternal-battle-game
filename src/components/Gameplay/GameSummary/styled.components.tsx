import { styled, Box, Stack, Typography, ButtonBase } from "@mui/material";
import { TITLE_STYLE, YELLOW } from "../../../config/general";
import CloseIcon from "@mui/icons-material/Close";

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
