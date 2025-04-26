import { Box, Stack, Typography } from "@mui/material";
import { TITLE_STYLE, YELLOW, BG_COLOR } from "../../../config/general";
import { RefObject } from "react";

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
