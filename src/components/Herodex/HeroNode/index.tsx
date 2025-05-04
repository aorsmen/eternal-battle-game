import {
  Checkbox,
  Box,
  IconButton,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NodeProps } from "@xyflow/react";
import { HeroNodeWrapper, HeroNodeToolbar } from "./styled.components";
import { HeroNodeType } from "../../../types/node.types";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useMainContext from "../../../hooks/useMainContext";
import HeroCard from "../../HeroCard";

const HeroNode = (props: NodeProps<HeroNodeType>) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const windowSize = matches ? "lg" : "sm";
  const { data, id, selected } = props;
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
    <HeroNodeWrapper size={windowSize}>
      {selected && (
        <HeroNodeToolbar alignment={data.details.biography.alignment}>
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
          <IconButton onClick={() => setNodeDetails(id)} aria-label="details">
            <InfoIcon
              fontSize="small"
              sx={{
                color: "#fff",
              }}
            />
          </IconButton>
          <IconButton onClick={deleteNodeHandler} aria-label="remove">
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
