import React, { useState, useEffect } from 'react';
import { ResponsiveContainer } from 'recharts';

export const LargeNetworkGraph = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [simulation, setSimulation] = useState(true);
  
  // Generate sample data
  useEffect(() => {
    // Generate nodes - in a real app this would come from your API
    const generateData = () => {
      const newNodes = [];
      const newLinks = [];
      
      // Create nodes with different groups
      for (let i = 0; i < 50; i++) {
        const group = Math.floor(Math.random() * 5);
        newNodes.push({
          id: `user-${i}`,
          name: `User ${i+1}`,
          group: group,
          size: 4 + Math.floor(Math.random() * 8),
          x: Math.random() * 800,
          y: Math.random() * 400
        });
      }
      
      // Create connections between nodes
      newNodes.forEach((node, idx) => {
        // Create more connections within the same group
        const sameGroupNodes = newNodes.filter(n => 
          n.group === node.group && n.id !== node.id
        );
        
        // Add 1-3 connections within the same group
        const intraGroupLinks = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < intraGroupLinks; i++) {
          if (sameGroupNodes.length > 0) {
            const targetIdx = Math.floor(Math.random() * sameGroupNodes.length);
            newLinks.push({
              id: `link-${idx}-${i}`,
              source: node.id,
              target: sameGroupNodes[targetIdx].id,
              strength: 0.7 + Math.random() * 0.3
            });
          }
        }
        
        // Occasionally add cross-group connections
        if (Math.random() > 0.7) {
          const otherGroupNodes = newNodes.filter(n => 
            n.group !== node.group
          );
          const targetIdx = Math.floor(Math.random() * otherGroupNodes.length);
          newLinks.push({
            id: `link-${idx}-cross`,
            source: node.id,
            target: otherGroupNodes[targetIdx].id,
            strength: 0.3 + Math.random() * 0.4
          });
        }
      });
      
      return { nodes: newNodes, links: newLinks };
    };
    
    const data = generateData();
    setNodes(data.nodes);
    setLinks(data.links);
  }, []);
  
  // Get color based on group
  const getNodeColor = (group) => {
    const colors = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];
    return colors[group % colors.length];
  };
  
  // Handle node selection
  const handleNodeClick = (nodeId) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };
  
  // Reset the simulation
  const resetSimulation = () => {
    // Reset node positions
    setNodes(prevNodes => 
      prevNodes.map(node => ({
        ...node,
        x: Math.random() * 800,
        y: Math.random() * 600
      }))
    );
    setSimulation(true);
  };
  
  return (
    <div className="flex flex-col w-full">
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">User Network Visualization</h2>
          <button 
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={resetSimulation}
          >
            Reset Layout
          </button>
        </div>
        
        <div className="w-full h-96 border border-gray-100 rounded bg-gray-50 relative">
          <svg width="100%" height="100%" viewBox="0 0 800 600">
            {/* Links */}
            {links.map(link => {
              const source = nodes.find(n => n.id === link.source);
              const target = nodes.find(n => n.id === link.target);
              
              if (!source || !target) return null;
              
              const isHighlighted = selectedNode && 
                (link.source === selectedNode || link.target === selectedNode);
              
              return (
                <line
                  key={link.id}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isHighlighted ? "#666" : "#ddd"}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeOpacity={isHighlighted ? 0.8 : 0.5}
                />
              );
            })}
            
            {/* Nodes */}
            {nodes.map(node => {
              const isSelected = selectedNode === node.id;
              const isConnected = selectedNode && links.some(
                link => (link.source === selectedNode && link.target === node.id) || 
                       (link.target === selectedNode && link.source === node.id)
              );
              
              return (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill={getNodeColor(node.group)}
                    stroke={isSelected || isConnected ? "#000" : "transparent"}
                    strokeWidth={isSelected ? 2 : 1}
                    opacity={selectedNode ? (isSelected || isConnected ? 1 : 0.4) : 0.9}
                    onClick={() => handleNodeClick(node.id)}
                    style={{ cursor: "pointer" }}
                  />
                  {(isSelected || node.size > 10) && (
                    <text
                      x={node.x}
                      y={node.y + node.size + 8}
                      textAnchor="middle"
                      fontSize={12}
                      fill="#333"
                    >
                      {node.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        <div className="mt-4 text-sm">
          <div className="flex flex-wrap gap-4 mb-2">
            <span className="font-medium">User Groups:</span>
            {[0, 1, 2, 3, 4].map(group => (
              <div key={group} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{ backgroundColor: getNodeColor(group) }}
                />
                <span>Group {group + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500">
            Click on a node to highlight connections. Node size represents user activity level.
          </p>
        </div>
      </div>
    </div>
  );
};