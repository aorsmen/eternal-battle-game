import { useState } from "react";
import {
  Autocomplete,
  TextField,
  ListItem,
  Stack,
  Button,
} from "@mui/material";
import { HeroItemType } from "../../../types/main.types";
import useMainContext from "../../../hooks/useMainContext";

const NodeIndex = () => {
  const { heroesData, heroesIsLoading, addHero, nodes } = useMainContext();
  const [selectedHero, setSelectedHero] = useState<HeroItemType | null>(null);

  const addHandler = () => {
    if (selectedHero?.id) {
      addHero(selectedHero.id);
      setSelectedHero(null);
    }
  };

  const heroList = heroesData.map((hero) => {
    return { id: hero.id, label: hero.name };
  });

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ marginLeft: "30px !important" }}
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
        />
        <Button
          variant="contained"
          color="warning"
          disabled={selectedHero === null}
          onClick={addHandler}
        >
          Add
        </Button>
      </Stack>
    </>
  );
};

export default NodeIndex;
