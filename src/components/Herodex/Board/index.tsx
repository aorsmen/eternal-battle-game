import { Box } from "@mui/material";
import { ReactFlow, ConnectionLineType, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import useMainContext from "../../../hooks/useMainContext";
import HeroNode from "../HeroNode";
import { BG_COLOR } from "../../../config/general";

const nodeTypes = {
  heroNode: HeroNode,
};

const Board = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, setReactFlowInstance } =
    useMainContext();

  return (
    <Box sx={{ width: "100%", height: "calc(100dvh - 64px)" }}>
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgesFocusable={false}
        deleteKeyCode={null}
        multiSelectionKeyCode={null}
        panOnDrag={false}
        panOnScroll={true}
        zoomOnScroll={false}
        connectionLineType={ConnectionLineType.Step}
        elevateEdgesOnSelect={true}
        zoomActivationKeyCode={null}
        panActivationKeyCode={null}
      >
        <Background style={{ background: BG_COLOR }} />
      </ReactFlow>
    </Box>
  );
};

export default Board;
