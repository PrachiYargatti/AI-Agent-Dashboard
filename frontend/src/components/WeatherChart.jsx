import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function WeatherChart() {

  const data = [
    { day: "Mon", temp: 28 },
    { day: "Tue", temp: 30 },
    { day: "Wed", temp: 29 },
    { day: "Thu", temp: 31 },
    { day: "Fri", temp: 32 }
  ];

  return (
    <LineChart
      width={350}
      height={200}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="temp"
      />
    </LineChart>
  );
}

export default WeatherChart;