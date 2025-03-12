import React from "react";
import ReactFlow, { Handle } from "reactflow";
import "reactflow/dist/style.css";
import { FaCircle, FaSquare, FaStar, FaPlay } from "react-icons/fa";

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2e2559",
        borderRadius: data.shape === "circle" ? "50%" : "5px",
        color: "white",
      }}
    >
      {data.icon}
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
};

const nodeTypes = { customNode: CustomNode };

const initialNodes = [
  { id: "1", type: "customNode", position: { x: 100, y: 100 }, data: { icon: <FaCircle />, shape: "circle" } },
  { id: "2", type: "customNode", position: { x: 250, y: 100 }, data: { icon: <FaSquare />, shape: "square" } },
  { id: "3", type: "customNode", position: { x: 400, y: 100 }, data: { icon: <FaStar />, shape: "star" } },
  { id: "4", type: "customNode", position: { x: 550, y: 100 }, data: { icon: <FaPlay />, shape: "triangle" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
];

export const FlowCanvas = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} />
    </div>
  );
};
