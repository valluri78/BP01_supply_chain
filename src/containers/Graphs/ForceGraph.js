import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const ForceGraph = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data) return;

    const width = 1800;
    const height = 900;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("max-width", "100%")
      .style("height", "auto");

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", (d) => color(d.group))
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    node.append("title").text((d) => d.id);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function handleMouseOver(event, d) {
      const tooltip = d3.select(tooltipRef.current);

      // Get neighbors
      const neighborLinks = links.filter((link) => link.source.id === d.id || link.target.id === d.id);
      const neighborIds = new Set(
        neighborLinks.flatMap((link) => [link.source.id, link.target.id])
      );
      neighborIds.delete(d.id); // Remove the current node itself

      const neighborNodes = nodes.filter((node) => neighborIds.has(node.id));

      tooltip
        .style("display", "block")
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`)
        .html(`
          <strong>Node:</strong> ${d.id} <br/>
          <strong>Group:</strong> ${d.group} <br/>
          <strong>Neighbors:</strong> ${neighborNodes.map((n) => n.id).join(", ") || "None"}
        `);
    }

    function handleMouseOut() {
      d3.select(tooltipRef.current).style("display", "none");
    }
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid black",
          borderRadius: "5px",
          display: "none",
          pointerEvents: "none",
        }}
      ></div>
    </div>
  );
};
