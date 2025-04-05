import { Box, styled } from "@mui/material";

export const CardSpot = styled(Box)({
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
    ></Box>
  );
};
