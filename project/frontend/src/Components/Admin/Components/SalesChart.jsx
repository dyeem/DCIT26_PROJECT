import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", Sales: 4000 },
  { month: "Feb", Sales: 3000 },
  { month: "Mar", Sales: 5000 },
  { month: "Apr", Sales: 7000 },
  { month: "May", Sales: 6000 },
  { month: "Jun", Sales: 8000 },
  { month: "May", Sales: 6000 },
  { month: "Jun", Sales: 8000 },
];

const SalesChart = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-screen-lg font-poppins">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Sales Overview</h2>
      <ResponsiveContainer width="100%" height={400} >
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fill: "#374151", fontSize: 14 }} />
          <YAxis tick={{ fill: "#374151", fontSize: 14 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#1f2937", color: "#fff", borderRadius: "8px" }}
            labelStyle={{ color: "#facc15" }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Legend verticalAlign="top" height={36} />
          <Line 
            type="monotone" 
            dataKey="Sales" 
            stroke="url(#colorSales)" 
            strokeWidth={3} 
            dot={{ fill: "#4F46E5", r: 5 }} 
            activeDot={{ r: 8 }} 
          />
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
