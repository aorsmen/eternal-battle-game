import { useContext } from "react";
import { MainContext } from "../store/Main";
import { MainContextType } from "../types/main.types";

const useMainContext = (): MainContextType => {
  const {
    nodes,
    edges,
    reactFlowInstance,
    heroesData,
    heroesIsLoading,
    nodeDetails,
    compareList,
    onNodesChange,
    onEdgesChange,
    setReactFlowInstance,
    setNodes,
    setEdges,
    addHero,
    removeHero,
    setNodeDetails,
    getHeroById,
    setCompare,
  } = useContext(MainContext);

  return {
    nodes,
    edges,
    reactFlowInstance,
    heroesData,
    heroesIsLoading,
    nodeDetails,
    compareList,
    onNodesChange,
    onEdgesChange,
    setReactFlowInstance,
    setNodes,
    setEdges,
    addHero,
    removeHero,
    setNodeDetails,
    getHeroById,
    setCompare,
  };
};

export default useMainContext;
