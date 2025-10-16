import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";

export default function Charts({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const COLORS = ["#86efac", "#fca5a5"]; // Soft green & red like SummaryCards

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
  ];
  const monthlyData = monthNames.map((month, index) => {
    const monthTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() === index
    );
    const monthIncome = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const monthExpense = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { month, Income: monthIncome, Expense: monthExpense };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-100">
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-700" />
          <h2 className="text-lg font-semibold text-green-800">
            Income vs Expense
          </h2>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, value }) => `${name}: ₹${value}`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-700" />
          <h2 className="text-lg font-semibold text-blue-800">
            Monthly Transactions
          </h2>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="month" tick={{ fill: "#4b5563", fontSize: 12 }} />
            <YAxis tick={{ fill: "#4b5563", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
              }}
            />
            <Legend />
            <Bar
              dataKey="Income"
              fill="#86efac"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />
            <Bar
              dataKey="Expense"
              fill="#fca5a5"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
