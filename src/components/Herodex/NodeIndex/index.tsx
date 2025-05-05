import { useState } from "react";
import {
  Autocomplete,
  TextField,
  ListItem,
  Stack,
  Button,
  Slide,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { HeroItemType } from "../../../types/main.types";
import useMainContext from "../../../hooks/useMainContext";
import { YELLOW, HEADER_HEIGHT } from "../../../config/general";

const NodeIndex = ({ isOpen }: { isOpen: boolean }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { heroesData, heroesIsLoading, addHero, nodes } = useMainContext();
  const [selectedHero, setSelectedHero] = useState<HeroItemType | null>(null);

  const addHandler = () => {
    if (selectedHero?.id) {
      addHero(selectedHero.id);
      setSelectedHero(null);
    }
  };
  console.log(isOpen);
  const heroList = heroesData.map((hero) => {
    return { id: hero.id, label: hero.name };
  });

  let content = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ marginLeft: matches ? "30px !important" : 0 }}
    >
      <Autocomplete
        disablePortal
        value={selectedHero}
        options={heroList}
        getOptionDisabled={(option) =>
          nodes.findIndex((nd) => nd.id === option.id) !== -1
        }
        loading={heroesIsLoading}
        renderOption={(props, option) => {
          return (
            <ListItem {...props} key={option.id}>
              {option.label}
            </ListItem>
          );
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} size="small" label="Select a hero" />
        )}
        onChange={(event, value) => {
          setSelectedHero(value);
        }}
        size="small"
      />
      <Button
        variant="contained"
        color="warning"
        disabled={selectedHero === null}
        onClick={addHandler}
        size="small"
      >
        Add
      </Button>
    </Stack>
  );

  if (!matches) {
    content = (
      <Slide direction="down" in={isOpen}>
        <Box
          sx={{
            padding: "5px 8px",
            backgroundColor: YELLOW,
            position: "fixed",
            left: 0,
            top: `${HEADER_HEIGHT.sm}px`,
            width: "100%",
            marginLeft: "0 !important",
            zIndex: 1,
          }}
        >
          {content}
        </Box>
      </Slide>
    );
  }

  return content;
};

export default NodeIndex;
