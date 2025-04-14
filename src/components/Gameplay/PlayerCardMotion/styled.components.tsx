import { ButtonBase, Box, styled } from "@mui/material";

export const CardSpot = styled(ButtonBase)({
  position: "relative",
  height: "370px",
  width: "270px",
});

export const HeroCardBack = ({ alignment }: { alignment: "good" | "bad" }) => {
  return (
    <Box
      className={`card-back${alignment === "good" ? " hero" : " villain"}`}
      sx={{
        width: "270px",
        height: "370px",
        borderRadius: "5px",
      }}
      data-testid="player-card-back"
    ></Box>
  );
};
