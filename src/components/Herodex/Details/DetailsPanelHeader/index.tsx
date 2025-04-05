import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HeaderWrapper } from "./styled.components";
import useMainContext from "../../../../hooks/useMainContext";

const DetailsPanelHeader = ({ title }: { title: string }) => {
  const { setNodeDetails } = useMainContext();
  return (
    <HeaderWrapper>
      <Typography sx={{ color: "#fff" }}>{title}</Typography>
      <IconButton onClick={() => setNodeDetails("")}>
        <CloseIcon fontSize="small" sx={{ color: "#fff" }} />
      </IconButton>
    </HeaderWrapper>
  );
};

export default DetailsPanelHeader;
