import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import useGameContext from "@/hooks/useGameContext";
import { GameSideTypes } from "@/types/game.types";
import { EB_BG, EB_BODY_FONT, EB_TEXT, EB_VILLAIN_LIGHT } from "@/config/general";
import TopBar from "@/components/UI/TopBar";
import {
  PageHeader,
  NameField,
  SideCard,
  StartButton,
} from "./styled.components";

const DEFAULT_ERRORS = {
  name: "",
  side: "",
};

const SideSelect = () => {
  const navigate = useNavigate();
  const { setSideSelection, sides } = useGameContext();
  const [name, setName] = useState(sides.player.name);
  const [side, setSide] = useState<GameSideTypes>(null);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);

  const nameChangeHandler = (value: string) => {
    setName(value);
    setErrors((prev) => ({ ...prev, name: "" }));
  };

  const sideSelectHandler = (value: GameSideTypes) => {
    setSide(value);
    setErrors((prev) => ({ ...prev, side: "" }));
  };

  const startHandler = () => {
    const playerName = name.trim();

    if (playerName === "" || side === null) {
      setErrors({
        name: playerName === "" ? "Please enter a proper name" : "",
        side: side === null ? "Please choose a side" : "",
      });
      return;
    }

    setSideSelection({
      name: playerName,
      type: side,
      score: 0,
      lastScore: 0,
    });
    navigate("play");
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100dvh",
        boxSizing: "border-box",
        background: EB_BG,
        color: EB_TEXT,
        fontFamily: EB_BODY_FONT,
        padding: "32px 24px 56px",
      }}
    >
      <Stack sx={{ maxWidth: "1040px", marginInline: "auto", gap: "40px" }}>
        <TopBar />
        <PageHeader />
        <NameField
          value={name}
          error={errors.name}
          onChange={nameChangeHandler}
        />
        <Stack sx={{ gap: "12px" }}>
          <Box
            role="radiogroup"
            aria-label="Side"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            <SideCard
              side="heroes"
              title="HEROES"
              description="Defenders of the realm. Play the hero deck and hold the line."
              selected={side === "heroes"}
              onSelect={() => sideSelectHandler("heroes")}
            />
            <SideCard
              side="villains"
              title="VILLAINS"
              description="Agents of chaos. Play the villain deck and tear it all down."
              selected={side === "villains"}
              onSelect={() => sideSelectHandler("villains")}
            />
          </Box>
          {errors.side && (
            <Box
              component="span"
              sx={{
                color: EB_VILLAIN_LIGHT,
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              {errors.side}
            </Box>
          )}
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "center" }}>
          <StartButton onClick={startHandler} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideSelect;
