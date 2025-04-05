import Board from "../../components/Herodex/Board";
import MainContextProvider from "../../store/Main";
import Header from "../../components/Herodex/Header";
import DetailsPanel from "../../components/Herodex/Details/DetailsPanel";
import ComparePanel from "../../components/Herodex/Compare/ComparePanel";
import "./Herodex.css";

const Herodex = () => {
  return (
    <MainContextProvider>
      <Header />
      <Board />
      <DetailsPanel />
      <ComparePanel />
    </MainContextProvider>
  );
};

export default Herodex;
