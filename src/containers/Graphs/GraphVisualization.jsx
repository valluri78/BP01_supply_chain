import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ForceGraph } from "./ForceGraph";
import {citedData, data } from './Mockdata';

export const GraphVisualization = () =>{
    const transformData = (citedData) => {
        const nodesMap = new Map();
        const links = [];
      
        citedData.forEach(({ _from, _to, Amount }) => {
          // Add nodes
          if (!nodesMap.has(_from)) nodesMap.set(_from, { id: _from, group: 1 });
          if (!nodesMap.has(_to)) nodesMap.set(_to, { id: _to, group: 1 });
      
          // Add link
          links.push({ source: _from, target: _to, amount: Amount });
        });
      
        return {
          nodes: Array.from(nodesMap.values()),
          links
        };
      };
      const transformedData = transformData(citedData);
       

    return <div>{transformedData ? <ForceGraph data={transformedData} /> : <p>Loading...</p>}</div>
}

