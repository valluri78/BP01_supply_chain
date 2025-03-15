import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {citedData, data } from './Mockdata';
import { ForceDirectedGraph } from './ForceDirectedGraph';
import { LesMiserablesGraph } from "./LesMiserablesGraph";

export const CitedWorkComponent = () =>{
    console.log("citedData", citedData.length);
    const transformData = (rawData) => {
        const nodesMap = new Map();
        const links = [];
      
        rawData.forEach(({ _from, _to, relation, disease }) => {
          // Ensure patients and diseases are added to nodes
          if (!nodesMap.has(_from)) {
            nodesMap.set(_from, { id: _from, group: _from.startsWith("patients/") ? "patient" : "disease" });
          }
          if (!nodesMap.has(_to)) {
            nodesMap.set(_to, { id: _to, group: _to.startsWith("patients/") ? "patient" : "disease" });
          }
      
          // Add link with an optional label for disease-sharing relations
          links.push({
            source: _from,
            target: _to,
            value: 1,
            label: relation === "shares_disease" ? disease : undefined,
          });
        });
      
        return { nodes: Array.from(nodesMap.values()), links };
      };
      const transformedData = transformData(citedData);      

    // return <div>{data ? <ForceDirectedGraph data={data} /> : <p>Loading...</p>}</div>
    return <div>
      <LesMiserablesGraph />
    </div>
}

