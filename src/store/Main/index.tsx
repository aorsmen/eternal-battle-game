import React, { createContext, useState, useEffect, useCallback } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { applyNodeChanges, ReactFlowProvider } from "@xyflow/react";
import {
  useNodesState,
  useEdgesState,
  Edge,
  ReactFlowInstance,
  NodeChange,
  Node,
} from "@xyflow/react";
import { MainContextType, HeroNodeType } from "../../types/main.types";
import { useQuery } from "@tanstack/react-query";
import { APIS } from "../../config/api";
import { calculateSkills, calculateValues } from "../../helpers/hero";
import {
  HERO_CARD_WIDTH,
  HERO_CARD_HEIGHT,
  HEADER_HEIGHT,
} from "../../config/general";

const initialNodes: HeroNodeType[] = [];
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
  const [nodes, setNodes] = useNodesState(initialNodes);
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

  const onNodesChange = useCallback((changes: NodeChange<Node>[]) => {
    const updates = changes as NodeChange<HeroNodeType>[];
    setNodes((nds: HeroNodeType[]) => applyNodeChanges(updates, nds));
  }, []);

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

    if (hero && reactFlowInstance) {
      const position = reactFlowInstance.screenToFlowPosition({
        x: 0,
        y: HEADER_HEIGHT[windowSize],
      });
      setNodes((prev) => {
        const newNodes = prev.map((nd) => ({ ...nd }));
        const inx = newNodes.findIndex((node) => node.id === id);

        if (inx === -1) {
          newNodes.push({
            id: id,
            position,
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
