import { Stack, Box } from "@mui/material";
import battleImage from "../../../assets/battle.png";

export const BattleControls = ({
  isCurrent,
  isMobile,
}: {
  isCurrent: boolean;
  isMobile: boolean;
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ height: isMobile ? "30px" : "100px" }}
    >
      <Box
        sx={{
          width: isMobile ? "20px" : "50px",
          fontSize: 0,
          filter: isCurrent ? "grayscale(0)" : "grayscale(1)",
        }}
      >
        <img
          src={battleImage}
          alt="Battle"
          width={isMobile ? 20 : 50}
          height={isMobile ? 14 : 36}
        />
      </Box>
    </Stack>
  );
};
