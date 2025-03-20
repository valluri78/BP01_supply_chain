
import { useState, useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { getNetworkData } from "./Mockdata";
import SettingsIcon from '@material-ui/icons/Settings';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Chip from '@material-ui/core/Chip';
import GraphOptionsMenu from "./GraphOptionsMenu";

export const GraphVisualization = () => {
  const [zoom, setZoom] = useState(1);
  const [isLocked, setIsLocked] = useState(false); // For future pan/lock feature
  const graphRef = useRef(null);
  const graphContainerRef = useRef(null);
  const [filteredNodes, setFilteredNodes] = useState([])

  const [graphData, setGraphData] = useState({
    nodes: [
      {
        id: "hub",
        name: "Database Management System",
        type: "central",
        value: 100,
        group: "central",
        color: "#d9d9d9",
      },
    ],
    links: [],
  });
  const networkData = getNetworkData("all");

  useEffect(() => {
    
    if (networkData) {
      setGraphData({
        nodes: networkData.nodes,
        links: networkData.links,
      });
    }
  }, []);

  const [scale, setScale] = useState(5);

  const zoomIn = () => setScale((prev) => prev + 1);
  const zoomOut = () => setScale((prev) => Math.max(0.5, prev - 1));

  // Toggle Fullscreen Mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      graphContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  console.log("scale", scale)

  useEffect(()=>{
    if (networkData){
      const newNodes = networkData.nodes.filter(
        (n) => n.type === "central" || n.type === "database"
      );
      setFilteredNodes(newNodes)
      const newLinks = networkData.links.filter((l) => l.source === "dbms");
      setGraphData({ nodes: newNodes, links: newLinks });
    }
  }, [])

  const handleNodeClick = (node) => {
    if (node.type === "central") {
      const newNodes = networkData.nodes.filter(
        (n) => n.type === "central" || n.type === "database"
      );
      const newLinks = networkData.links.filter((l) => l.source === "dbms");
      setFilteredNodes(newNodes)
      setGraphData({ nodes: newNodes, links: newLinks });
    } else if (node.type === "database") {
      const newNodes = networkData.nodes.filter(
        (n) =>
          n.id === node.id ||
          n.type === "central" ||
          n.type === "database" ||
          networkData.links.some(
            (l) => l.source === node.id && l.target === n.id
          )
      );
      const newLinks = networkData.links.filter(
        (l) => l.source === node.id || l.source === "dbms"
      );
      const filterednNodes = networkData.nodes.filter(
        (n) => n.type === "central" || n.type === "database"
      );
      setFilteredNodes(filterednNodes)
      setGraphData({ nodes: newNodes, links: newLinks });
    } else if (node.type === "table") {
      const newNodes = networkData.nodes.filter(
        (n) =>
          n.id === node.id ||
          n.type === "central" ||
          n.type === "database" ||
          networkData.links.some(
            (l) => l.source === node.id && l.target === n.id
          )
      );
      const newLinks = networkData.links.filter(
        (l) => l.source === node.id || l.source === "dbms"
      );
      const filterednNodes = networkData.nodes.filter(
        (n) => n.type === "central" || n.type === "database"
      );
      setFilteredNodes(filterednNodes)
      setGraphData({ nodes: networkData.nodes, links: networkData.links });
    }
  };


  return (
    <div ref={graphContainerRef} style={{backgroundColor:'#fafcfe'}}>
        <ForceGraph2D
          graphData={graphData}
          nodeLabel={(node) => `${node.name}`}
          nodeAutoColorBy="type"
          nodeRelSize={4}
          linkWidth={2}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          minZoom={scale}
          maxZoom={15}
          backgroundColor="#f8f9fa"
          onNodeClick={handleNodeClick}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const fontSize = 8 / globalScale;
            const baseNodeSize = 10 / globalScale;
            const padding = 6 / globalScale;

            let nodeSize = baseNodeSize;
            if (node.type === "central") {
              nodeSize = 20; // Fixed size for the central node
            } else if (node.type === "database") {
              nodeSize = 8; // Ensure all databases are the same size
            } else {
              nodeSize = 6;
            }
            const iconSize = 16;
            const nodeImages = 'https://res.cloudinary.com/dyofpgt7k/image/upload/v1742128425/supplyChain_tk8zwd.png'
            // Ensure image is loaded before drawing
            if (nodeImages.complete) {
              ctx.drawImage(nodeImages, node.x - iconSize / 2, node.y - iconSize / 2, iconSize, iconSize);
            }
            ctx.font = `${fontSize}px Sans-Serif`;

            // Wrap text if database name exceeds 8 characters
            const maxCharsPerLine = 8;
            const words = node.name.split(" ");
            const lines = [];

            let currentLine = "";
            words.forEach((word) => {
              if ((currentLine + word).length > maxCharsPerLine) {
                lines.push(currentLine);
                currentLine = word;
              } else {
                currentLine += (currentLine ? " " : "") + word;
              }
            });
            if (currentLine) lines.push(currentLine);

            // Draw Node Background
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
            ctx.closePath();

            // Set color based on node type
            ctx.fillStyle = node.color;

            ctx.fill();
            // Draw Multi-line Label
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = node.type === "central" ? "#336497" : node.type === "table"? "black":"white";

            lines.forEach((line, i) => {
              ctx.fillText(
                line,
                node.x,
                node.y - (lines.length - 1) * (fontSize / 2) + i * fontSize
              );
            });
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(
              node.x,
              node.y,
              node.type === "central" ? 20 : 10,
              0,
              2 * Math.PI,
              false
            );
            ctx.fill();
          }}
        />

      {/* Zoom Controls */}
      <div style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        backgroundColor: "#fafcfe",
        boxShadow: "0px 2px 5px   #dbddde",
        borderColor:'#dbddde',
        borderRadius: "5px",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "center"
      }}>
        <button onClick={zoomIn} style={styles.button}><ZoomInIcon style={{color:'b3b3b3'}}/></button>
        <button onClick={zoomOut} style={styles.button}><ZoomOutIcon style={{color:'b3b3b3'}}/></button>
        <button onClick={toggleFullscreen} style={styles.button}><FullscreenIcon style={{color:'b3b3b3'}}/></button>
      </div>
      <div style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        border:'1px solid #b0b0b0',
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "center",
      }}>
        <GraphOptionsMenu />
      </div>
      <div style={{
        position: "fixed",
        top: 200,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "center",
        height:'500px',
      }}>
       {filteredNodes.map((node, index) => (
        <Chip
          key={index}
          label={node.name}
          onClick={()=>handleNodeClick(node)}
          style={{
            backgroundColor: node.color,
            color: "#000",
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "16px",
            padding: "8px 12px",
            marginBottom: "6px",
            width: "150px",
            textAlign: "center",
          }}
        />
      ))}
      </div>
    </div>
    
  );
};

// Button Styles
const styles = {
  button: {
    background: "white",
    border: "1px solid #ddd",
    padding: "8px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
  }
};
