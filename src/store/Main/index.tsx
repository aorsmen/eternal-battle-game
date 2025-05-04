import React, { createContext, useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { ReactFlowProvider } from "@xyflow/react";
import {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ReactFlowInstance,
} from "@xyflow/react";
import { MainContextType } from "../../types/main.types";
import { useQuery } from "@tanstack/react-query";
import { APIS } from "../../config/api";
import { calculateSkills, calculateValues } from "../../helpers/hero";
import { HERO_CARD_WIDTH, HERO_CARD_HEIGHT } from "../../config/general";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const initState: MainContextType = {
  nodes: [],
  edges: [],
  heroesData: [],
  heroesIsLoading: false,
  nodeDetails: "",
  compareList: [],
  onNodesChange: () => {},
  onEdgesChange: () => {},
  setReactFlowInstance: () => {},
  setNodes: () => {},
  setEdges: () => {},
  addHero: () => {},
  removeHero: () => {},
  setNodeDetails: () => {},
  getHeroById: () => null,
  setCompare: () => {},
};

export const MainContext = createContext(initState);

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const [nodeDetails, setNodeDetails] = useState(initState.nodeDetails);
  const [heroesData, setHeroesData] = useState(initState.heroesData);
  const [compareList, setCompareList] = useState(initState.compareList);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const windowSize = matches ? "lg" : "sm";

  const { data, isLoading: heroesIsLoading } = useQuery({
    queryKey: ["hero-data"],
    queryFn: async () => {
      const response = await fetch(APIS.heroData);
      return await response.json();
    },
  });

  const getHeroById = (id: string) => {
    const hero = heroesData.filter((hr) => hr.id === id);

    if (hero.length === 1) {
      const heroData = hero[0];
      heroData.skills = calculateSkills(heroData.powerstats);
      heroData.values = calculateValues(heroData.skills);

      return { ...heroData };
    }

    return null;
  };

  const addHero = (id: string) => {
    const hero = getHeroById(id);

    if (hero) {
      setNodes((prev) => {
        const newNodes = [...prev];
        const inx = newNodes.findIndex((node) => node.id === id);

        if (inx === -1) {
          newNodes.push({
            id: id,
            position: { x: 0, y: 0 },
            data: {
              label: hero.name,
              details: hero,
            },
            type: "heroNode",
            width: HERO_CARD_WIDTH[windowSize],
            height: HERO_CARD_HEIGHT[windowSize],
          });
        }

        return newNodes;
      });
    }
  };

  const removeHero = (id: string) => {
    setNodes((prev) => {
      const newNodes = prev.filter((nd) => nd.id !== id);

      return newNodes;
    });
  };

  const setCompare = (id: string, action: "add" | "remove" | "clear") => {
    setCompareList((prev) => {
      let newList = [...prev];
      const inx = newList.findIndex((item) => item === id);

      if (action === "add" && newList.length < 4) {
        if (inx === -1) {
          newList.push(id);
        }
      }

      if (action === "remove") {
        newList.splice(inx, 1);
      }

      if (action === "clear") {
        newList = [];
      }

      return newList;
    });
  };

  useEffect(() => {
    if (data) {
      setHeroesData(data);
    }
  }, [data]);

  return (
    <MainContext.Provider
      value={{
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
      }}
    >
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </MainContext.Provider>
  );
};

export default MainContextProvider;
