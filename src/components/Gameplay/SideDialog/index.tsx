import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ButtonBase,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useGameContext from "../../../hooks/useGameContext";
import { GameSideTypes } from "../../../types/game.types";
import heroesImage from "../../../assets/heroes.png";
import villainsImage from "../../../assets/villains.png";
import { BROWN, TITLE_STYLE } from "../../../config/general";
import { LazyLoadImage } from "react-lazy-load-image-component";

const DEFAULT_INPUTS = {
  name: "",
  side: null,
};

const DEFAULT_ERRORS = {
  name: "",
};

const SideDialog = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { setSideSelection, sides } = useGameContext();
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const isOpen = sides.player.type === null;
  const hasName = sides.player.name !== "";

  const selectSideHandler = (side: GameSideTypes) => {
    if ((inputs.name !== "" || hasName) && side) {
      setSideSelection({
        name: inputs.name || sides.player.name,
        type: side,
        score: 0,
        lastScore: 0,
      });
      setErrors(DEFAULT_ERRORS);
      setInputs(DEFAULT_INPUTS);
    } else {
      if (inputs.name.length < 3) {
        setErrors((prev) => ({
          ...prev,
          name: "Please enter a proper name",
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
          fontSize: "24px",
          padding: "12px 18px",
        }}
      >
        Player Info
      </DialogTitle>
      <DialogContent>
        <form>
          {!hasName && (
            <Stack
              direction="row"
              justifyContent="center"
              sx={{ marginTop: "25px" }}
            >
              <TextField
                id="player-name"
                label="Player Name"
                variant="filled"
                fullWidth
                sx={{ maxWidth: matches ? "50%" : "none" }}
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
          )}
          <Typography
            sx={{
              ...TITLE_STYLE,
              textAlign: "center",
              fontSize: "20px",
              marginTop: "25px",
            }}
          >
            Choose your side
          </Typography>
          <Stack direction="row" spacing={3} sx={{ paddingTop: "20px" }}>
            <ButtonBase
              onClick={() => selectSideHandler("heroes")}
              sx={{ flex: 1, overflow: "hidden", borderRadius: "5px" }}
            >
              <LazyLoadImage
                alt="Heroes"
                height={414}
                src={heroesImage}
                width={414}
              />
            </ButtonBase>
            <ButtonBase
              onClick={() => selectSideHandler("villains")}
              sx={{ flex: 1, overflow: "hidden", borderRadius: "5px" }}
            >
              <LazyLoadImage
                alt="Villains"
                height={414}
                src={villainsImage}
                width={414}
              />
            </ButtonBase>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SideDialog;
