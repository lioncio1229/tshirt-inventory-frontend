import { Paper, Select, MenuItem, FormControl, Stack, Typography } from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart() {
  const data = [
    {
      name: "Page A",
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <Paper sx={{p: 2}}>
        <Stack flexDirection="row" justifyContent="space-between">
            <Typography color="primary" fontSize={20} fontWeight="600">Analytics</Typography>
            <FormControl sx={{mb: 2, mr: 1}}>
                <Select
                    value={10}
                    size="small"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Stack>
        <ResponsiveContainer height={400}>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                right: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    </Paper>
  );
}
