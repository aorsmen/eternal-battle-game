import Board from "../../components/Herodex/Board";
import MainContextProvider from "../../store/Main";
import Header from "../../components/UI/Header";
import DetailsPanel from "../../components/Herodex/Details/DetailsPanel";
import ComparePanel from "../../components/Herodex/Compare/ComparePanel";
import NodeIndex from "../../components/Herodex/NodeIndex";
import "./Herodex.css";

const Herodex = () => {
  return (
    <MainContextProvider>
      <Header title="HERODEX">
        <NodeIndex />
      </Header>
      <Board />
      <DetailsPanel />
      <ComparePanel />
    </MainContextProvider>
  );
};

export default Herodex;
