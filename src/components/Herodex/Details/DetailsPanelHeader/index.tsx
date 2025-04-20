import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HeaderWrapper } from "./styled.components";
import useMainContext from "../../../../hooks/useMainContext";
import { HERO_BLUE_DARK, VILLAIN_RED_DARK } from "../../../../config/general";

const DetailsPanelHeader = ({
  title,
  alignment,
}: {
  title: string;
  alignment: "good" | "bad";
}) => {
  const { setNodeDetails } = useMainContext();
  const bgColor = alignment === "good" ? HERO_BLUE_DARK : VILLAIN_RED_DARK;

  return (
    <HeaderWrapper bg={bgColor}>
      <Typography sx={{ color: "#fff" }}>{title}</Typography>
      <IconButton onClick={() => setNodeDetails("")} aria-label="close">
        <CloseIcon fontSize="small" sx={{ color: "#fff" }} />
      </IconButton>
    </HeaderWrapper>
  );
};

export default DetailsPanelHeader;
