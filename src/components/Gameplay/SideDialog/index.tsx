import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ButtonBase,
  Stack,
  Avatar,
  TextField,
  Typography,
} from "@mui/material";
import useGameContext from "../../../hooks/useGameContext";
import { GameSideTypes } from "../../../types/game.types";
import heroesImage from "../../../assets/heroes.png";
import villainsImage from "../../../assets/villains.png";
import { BROWN, TITLE_STYLE } from "../../../config/general";

const DEFAULT_INPUTS = {
  name: "",
  side: null,
};

const DEFAULT_ERRORS = {
  name: "",
};

const SideDialog = () => {
  const { setSideSelection, sides } = useGameContext();
  const [isOpen, setIsOpen] = useState(sides.player.type === null);
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);

  const selectSideHandler = (side: GameSideTypes) => {
    if (inputs.name !== "" && side) {
      setSideSelection({ name: inputs.name, type: side, score: 0 });
      setIsOpen(false);
      setErrors(DEFAULT_ERRORS);
      setInputs(DEFAULT_INPUTS);
    } else {
      if (inputs.name === "") {
        setErrors((prev) => ({
          ...prev,
          name: "Name is required",
        }));
      }

      if (inputs.name.length < 3) {
        setErrors((prev) => ({
          ...prev,
          name: "Name must be at least 3 characters",
        }));
      }
    }
  };

  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          background: BROWN,
          color: "#fff",
          textAlign: "center",
          ...TITLE_STYLE,
          fontSize: "28px",
        }}
      >
        Player Info
      </DialogTitle>
      <DialogContent>
        <form>
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ margin: "25px auto" }}
          >
            <TextField
              id="player-name"
              label="Player Name"
              variant="filled"
              fullWidth
              sx={{ maxWidth: "50%" }}
              error={errors.name !== ""}
              helperText={errors.name}
              onChange={(event) => {
                const name = event.target.value.trim();

                setInputs((prev) => ({
                  ...prev,
                  name: name,
                }));

                setErrors((prev) => ({
                  ...prev,
                  name: "",
                }));
              }}
            />
          </Stack>
          <Typography
            sx={{ ...TITLE_STYLE, textAlign: "center", fontSize: "20px" }}
          >
            Choose your side
          </Typography>
          <Stack direction="row" spacing={3} sx={{ paddingTop: "20px" }}>
            <ButtonBase
              onClick={() => selectSideHandler("heroes")}
              sx={{ flex: 1 }}
            >
              <Avatar
                variant="rounded"
                src={heroesImage}
                alt="Heroes"
                sx={{ width: "100%", height: "100%" }}
              />
            </ButtonBase>
            <ButtonBase
              onClick={() => selectSideHandler("villains")}
              sx={{ flex: 1 }}
            >
              <Avatar
                variant="rounded"
                src={villainsImage}
                alt="Villains"
                sx={{ width: "100%", height: "100%" }}
              />
            </ButtonBase>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SideDialog;
