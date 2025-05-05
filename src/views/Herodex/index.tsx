import { useState } from "react";
import { ButtonBase, useMediaQuery, useTheme } from "@mui/material";
import Board from "../../components/Herodex/Board";
import MainContextProvider from "../../store/Main";
import Header from "../../components/UI/Header";
import DetailsPanel from "../../components/Herodex/Details/DetailsPanel";
import ComparePanel from "../../components/Herodex/Compare/ComparePanel";
import NodeIndex from "../../components/Herodex/NodeIndex";
import "./Herodex.css";
import SearchIcon from "@mui/icons-material/Search";

const Herodex = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const [searchActive, setSearchActive] = useState(false);

  return (
    <MainContextProvider>
      <Header
        title="HERODEX"
        addon={!matches && <NodeIndex isOpen={searchActive} />}
      >
        {!matches ? (
          <ButtonBase
            sx={{ marginLeft: "auto !important" }}
            onClick={() => setSearchActive((prev) => !prev)}
            aria-label="Search"
          >
            <SearchIcon fontSize="small" />
          </ButtonBase>
        ) : (
          <NodeIndex isOpen={searchActive} />
        )}
      </Header>
      <Board />
      <DetailsPanel />
      <ComparePanel />
    </MainContextProvider>
  );
};

export default Herodex;
