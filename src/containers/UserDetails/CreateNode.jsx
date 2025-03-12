import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  MarkerType,
  Handle,
  Position
} from "reactflow";
import "reactflow/dist/style.css";
import { FaCircle, FaSquare, FaStar, FaTriangle, FaHexagon, FaHeart } from "react-icons/fa";
import MaximizeIcon from '@material-ui/icons/Maximize';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';

const icons = [
  { type: "circleNode", icon: <FaCircle size={20} />, label: "Circle" },
  { type: "squareNode", icon: <FaSquare size={20} />, label: "Square" },
  { type: "starNode", icon: <FaStar size={20} />, label: "Star" },
  { type: "traingleNode", icon: <ChangeHistoryIcon size={20} />, label: "triangle" },
];

const CustomNode = ({ data }) => (
    <div
    style={{
        position: "relative",
        padding: 5,
        background: "white",
        border: "1px solid black",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `rotate(${data.rotation || 0}deg)`, // Apply rotation
        transition: "transform 0.3s ease-in-out",
      }}
    >
      {data.icon}
      
      {/* Handles for connections */}
      <Handle type="target" position={Position.Left} style={{ background: "red" }} />
      <Handle type="source" position={Position.Right} style={{ background: "blue" }} />
    </div>
  );

const nodeTypes = icons.reduce((acc, { type, icon }) => {
  acc[type] = (props) => <CustomNode {...props} data={{ ...props.data, icon }} />;
  return acc;
}, {});

const initialNodes = [];
const initialEdges = [];

const ReactFlowCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => 
    setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)), 
    [setEdges]
  );

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const nodeType = event.dataTransfer.getData("application/reactflow");

    if (!nodeType) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: nodes.length * 60 + 50,
    });

    const newNode = {
      id: `${nodes.length + 1}`,
      type: nodeType,
      position,
      data: { label: `${nodeType} Node`, color: "blue" },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeDoubleClick = (event, node) => {
    setNodes((nds) => nds.filter((n) => n.id !== node.id));
    setEdges((eds) => eds.filter((edge) => edge.source !== node.id && edge.target !== node.id));
  };

  const saveDiagram = () => {
    console.log("Nodes:", nodes);
    console.log("Edges:", edges);
  };

  return (
    <div >
      <div style={{ display: "flex", flexWrap: "wrap", padding: "10px", }}>
        {icons.map(({ type, icon, label }) => (
          <span key={type} draggable onDragStart={(event) => onDragStart(event, type)} style={{margin: "10px", cursor: "pointer"}}>
            {icon}
          </span>
        ))}
      </div>

      <div ref={reactFlowWrapper} style={{ width: "100vw", height: "90vh",  }} onDrop={onDrop} onDragOver={(event) => event.preventDefault()}>
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onInit={setReactFlowInstance} fitView nodeTypes={nodeTypes} onNodeDoubleClick={onNodeDoubleClick} >
        </ReactFlow>
      </div>
    </div>
  );
};

export const CreateNode = () => {
  return (
    <ReactFlowProvider>
      <ReactFlowCanvas />
    </ReactFlowProvider>
  );
};
