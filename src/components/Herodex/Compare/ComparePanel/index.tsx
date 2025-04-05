import { useState } from "react";
import { AppBar, Stack, Button, Slide } from "@mui/material";
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
        <AppBar
          position="fixed"
          sx={{
            top: "auto",
            bottom: 0,
            background: "#fff",
            color: "#000",
            padding: "10px 20px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
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
            <Stack direction="row" alignItems="center" spacing={2}>
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
        </AppBar>
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
