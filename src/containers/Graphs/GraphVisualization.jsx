import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ForceGraph } from "./ForceGraph";
import {data } from './Mockdata';

export const GraphVisualization = () =>{


    return <div>{data ? <ForceGraph data={data} /> : <p>Loading...</p>}</div>
}

