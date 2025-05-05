import { useState } from "react";
import { Paper, Stack, Button, Slide } from "@mui/material";
import useMainContext from "../../../../hooks/useMainContext";
import HeroAvatar from "../../HeroAvatar";
import CompareDialog from "../CompareDialog";

const ComparePanel = () => {
  const [isComparing, setIsComparing] = useState(false);
  const { compareList, setCompare, getHeroById } = useMainContext();

  const clearHandler = () => {
    setCompare("", "clear");
  };

  const compareIsDisabled = compareList.length < 2;

  return (
    <>
      <Slide
        direction="up"
        in={compareList.length > 0}
        mountOnEnter
        unmountOnExit
      >
        <Paper
          sx={{
            position: "fixed",
            top: "auto",
            bottom: 0,
            background: "#fff",
            color: "#000",
            padding: "10px",
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {compareList.map((id) => {
                const hero = getHeroById(id);

                return (
                  <HeroAvatar
                    key={id}
                    size={48}
                    alt={hero?.name || ""}
                    src={hero?.images.md || ""}
                    variant="rounded"
                  />
                );
              })}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={clearHandler}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={compareIsDisabled}
                onClick={() => setIsComparing(true)}
              >
                Compare
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Slide>
      {isComparing && (
        <CompareDialog
          isOpen={isComparing}
          onClose={() => setIsComparing(false)}
        />
      )}
    </>
  );
};

export default ComparePanel;
