import { Checkbox, Box, IconButton, FormControlLabel } from "@mui/material";
import { NodeProps } from "@xyflow/react";
import { HeroNodeWrapper, HeroNodeToolbar } from "./styled.components";
import { HeroNodeType } from "../../../types/node.types";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useMainContext from "../../../hooks/useMainContext";
import HeroCard from "../../HeroCard";

const HeroNode = (props: NodeProps<HeroNodeType>) => {
  const { data, id, selected, dragging } = props;
  const { setNodeDetails, removeHero, setCompare, compareList } =
    useMainContext();

  const deleteNodeHandler = () => {
    setNodeDetails("");
    removeHero(id);
  };

  const checkHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const action = checked ? "add" : "remove";

    setCompare(id, action);
  };

  const isComparing = compareList.includes(id);

  return (
    <HeroNodeWrapper>
      {selected && (
        <HeroNodeToolbar>
          <Box sx={{ marginRight: "auto", paddingInline: "9px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={isComparing}
                  onChange={checkHandler}
                  sx={{
                    color: "#fff",
                  }}
                />
              }
              label="Compare"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                  color: "#fff",
                },
              }}
            />
          </Box>
          <IconButton onClick={() => setNodeDetails(id)}>
            <InfoIcon
              fontSize="small"
              sx={{
                color: "#fff",
              }}
            />
          </IconButton>
          <IconButton onClick={deleteNodeHandler}>
            <DeleteOutlineIcon
              fontSize="small"
              sx={{
                color: "#fff",
              }}
            />
          </IconButton>
        </HeroNodeToolbar>
      )}
      <HeroCard data={data.details} />
    </HeroNodeWrapper>
  );
};

export default HeroNode;
