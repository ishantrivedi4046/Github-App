import { Skeleton } from "antd";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

interface ChartProps {
  Chart: string;
  data: any;
  width?: any;
  legend?: boolean;
  height?: any;
  LineStroke?: string;
  gridStroke?: string;
  xDataKey: string;
  yDataKey: string;
  legendAlign?: "top" | "bottom" | "middle";
  barColor?: string;
  areaColor?: string;
}

const ChartComponent: React.FC<ChartProps> = (props: ChartProps) => {
  let chart = <Skeleton />;
  switch (props.Chart) {
    case "LINE":
      chart = (
        <ResponsiveContainer width={props.width} height={props.height}>
          <LineChart
            data={props.data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line
              type="monotone"
              dataKey={props.yDataKey}
              stroke={props.LineStroke}
            />
            <CartesianGrid stroke={props.gridStroke} strokeDasharray="3 3" />
            <XAxis dataKey={props.xDataKey} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign={props.legendAlign} />
          </LineChart>
        </ResponsiveContainer>
      );
      break;
    case "BAR":
      chart = (
        <ResponsiveContainer width={props.width} height={props.height}>
          <BarChart
            data={props.data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid stroke={props.gridStroke} strokeDasharray="3 3" />
            <XAxis dataKey={props.xDataKey} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign={props.legendAlign} />
            <Bar dataKey={props.yDataKey} fill={props.barColor} />
          </BarChart>
        </ResponsiveContainer>
      );
      break;
    case "AREA":
      chart = (
        <ResponsiveContainer width={props.width} height={props.height}>
          <AreaChart
            data={props.data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={props.areaColor}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={props.areaColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={props.gridStroke} strokeDasharray="3 3" />
            <XAxis dataKey={props.xDataKey} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign={props.legendAlign} />
            <Area
              dataKey={props.yDataKey}
              fillOpacity={1}
              fill="url(#colorCount)"
              type="monotone"
              stroke={props.areaColor}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
      break;
  }
  return chart;
};

export default React.memo(ChartComponent);
