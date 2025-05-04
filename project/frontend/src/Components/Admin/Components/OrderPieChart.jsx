import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 80 },
  { name: "Pending", value: 15 },
  { name: "Canceled", value: 5 },
];

const COLORS = ["#22C55E", "#FACC15", "#EF4444"];

const OrderPieChart = () => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="p-2 bg-white rounded-xl shadow-lg w-full max-w-lg ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 p-3">Order Status Distribution</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie 
            data={data} 
            cx="50%" 
            cy="50%" 
            outerRadius={120} 
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${((value / total) * 100).toFixed(1)}%`, "Percentage"]}
            contentStyle={{ backgroundColor: "#FFFFFF", color: "#fff", borderRadius: "8px" }}
          />
          <Legend verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderPieChart;
