import { Stack, Box } from "@mui/material";
import battleImage from "../../../assets/battle.png";

export const BattleControls = ({ isCurrent }: { isCurrent: boolean }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100px" }}
    >
      <Box
        sx={{
          width: "50px",
          fontSize: 0,
          filter: isCurrent ? "grayscale(0)" : "grayscale(1)",
        }}
      >
        <img src={battleImage} alt="Battle" width={50} height={36} />
      </Box>
    </Stack>
  );
};
