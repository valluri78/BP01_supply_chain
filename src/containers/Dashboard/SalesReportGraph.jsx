import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis,Tooltip, ReferenceLine, YAxis, Legend } from "recharts";

export const SalesReportGraph = () => {
    const data = [
        { name: 'Jan', uv: 34000 },
        { name: 'Feb', uv: 37000 },
        { name: 'Mar', uv: 41500 },
        { name: 'Apr', uv: 44000 },
        { name: 'May', uv: 41000 },
        { name: 'Jun', uv: 36000 },
        { name: 'Jul', uv: 47000 },
        { name: 'Aug', uv: 40500 },
        { name: 'Sep', uv: 47500 },
        { name: 'Oct', uv: 43000 },
        { name: 'Nov', uv: 50000 },
        { name: 'Dec', uv: 45000 },
      ];

      const medianValue = 45000;
    
        const [activeIndex, setActiveIndex] = useState(0);

        const handleClick = (data, index) => {
          setActiveIndex(index);
        };

        const CustomTick = ({ x, y, payload }) => {
            return (
              <g transform={`translate(${x-25},${y})`}>
                <rect
                  width={50}
                  height={30}
                  rx={6} // Border radius
                  ry={6}
                  fill={payload.index === activeIndex? '#2d2458' : '#f9f9fd'} // White background
                />
                <text
                  x={25}
                  y={15}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill={payload.index === activeIndex? '#fff' : '"#676287"'}
                  fontSize="12px"
                  fontWeight="500"
                >
                  {payload.value}
                </text>
              </g>
            );
          };  
          
          const MedianLabel = () => (
            <Box sx={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                <span style={{ color: 'red' }}>●</span> Median ${medianValue}
              </Typography>
            </Box>
          );
    
        return (
          <div style={{ width: '100%' }}>
            <ResponsiveContainer width={650} height={200}>
              <BarChart width={150} height={40} data={data}>
              <XAxis dataKey="name" tick={<CustomTick />} tickLine={false} axisLine={{ stroke: 'lightgrey' }} />
              <YAxis domain={[30000, 50000]} tickLine={false} tickFormatter={() => ""} axisLine={false} hide={true} />
            <Tooltip />         
              <ReferenceLine y={medianValue} label={<MedianLabel />} stroke="lightgrey" />
                <Bar dataKey="uv" onClick={handleClick} radius={[10, 10, 0, 0]} >
                  {data.map((entry, index) => (
                    <Cell cursor="pointer" fill={index === activeIndex ? '#6250fc' : '#e4e5f9'} key={`cell-${index}`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

          </div>
        );
      
}