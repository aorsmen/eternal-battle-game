import { Stack, Button, Box } from "@mui/material";
import useGameContext from "../../../hooks/useGameContext";
import battleImage from "../../../assets/battle-sm.png";

const GameControls = () => {
  const { drawCard, hands, currentBattle } = useGameContext();

  return (
    <Stack alignItems="center">
      <Stack direction="row" spacing={2}>
        {hands.player.map((item, index) => {
          return (
            <Stack key={index} alignItems="center" sx={{ width: "270px" }}>
              <Box sx={{ width: "100px", height: "100px" }}>
                {index === currentBattle && (
                  <img src={battleImage} alt="Battle" />
                )}
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default GameControls;
