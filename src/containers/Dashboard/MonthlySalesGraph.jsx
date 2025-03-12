import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
    { name: '1', uv: 1200 },
    { name: '2', uv: 5000 },
    { name: '3', uv: 4000 },
    { name: '4', uv: 7180 },
    { name: '5', uv: 6990 },
    { name: '6', uv: 9190 },
    { name: '7', uv: 7490 },
    { name: '8', uv: 10190 },
    { name: '9', uv: 12850 },
    { name: '10', uv: 10000 },
    { name: '11', uv: 13200 },
];

export const MonthlySalesGraph = () => {

    const CustomTick = ({ x, y, payload }) => {
        return (
          <g transform={`translate(${x},${y})`}>
            <rect
              width={25}
              height={25}
              rx={6} // Border radius
              ry={6}
              fill= '#d6e0fc'  // White background
            />
            <text
              x={12}
              y={13}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="#5e5b89"
              fontSize="12px"
              fontWeight="500"
            >
              {payload.value}
            </text>
          </g>
        );
      };

    return (
        <div>
            <ResponsiveContainer width={370} height={150}>
                <AreaChart
                    width={200}
                    height={60}
                    data={data}
                >
                    <XAxis dataKey="name" 
                    tick={<CustomTick />}
                     tickLine={false} 
                     axisLine={{ stroke: 'lightgrey' }}
                     interval={0}
                     />
                     <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8aa9fc" fill="#d0ddff" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}