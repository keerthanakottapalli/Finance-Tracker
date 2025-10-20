import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import useTransactions from "../hooks/useTransactions";

export default function Analytics() {
  const { transactions } = useTransactions();

  if (!transactions.length) {
    return <p className="text-center text-gray-500 mt-10">No transactions yet to analyze 📉</p>;
  }

  // --- Monthly summary ---
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    const existing = acc.find((m) => m.name === month);
    if (existing) {
      if (t.type === "income") existing.income += t.amount;
      else existing.expense += t.amount;
    } else {
      acc.push({
        name: month,
        income: t.type === "income" ? t.amount : 0,
        expense: t.type === "expense" ? t.amount : 0,
      });
    }
    return acc;
  }, []);

  // Category-wise Expense
  const categoryData = transactions.reduce((acc, t) => {
    const existing = acc.find((c) => c.name === t.category);
    if (existing) existing.value += t.amount;
    else acc.push({ name: t.category, value: t.amount });
    return acc;
  }, []);

  // --- Balance trend ---
  let cumulative = 0;
  const trendData = transactions
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((t) => {
      cumulative += t.type === "income" ? t.amount : -t.amount;
      return { date: new Date(t.date).toLocaleDateString(), balance: cumulative };
    });

  const COLORS = ["#61C9F5", "#B6DDEE"];

  return (
    <div className="pt-26 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📊 Analytics Dashboard</h1>

      {/* Income vs Expense by Month */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Monthly Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#B6DDEE" name="Income" />
            <Bar dataKey="expense" fill="#61C9F5" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category-wise Expense */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Spending by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} label>
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={["#60A5FA", "#FBBF24", "#F87171", "#34D399", "#A78BFA", "#F472B6"][index % 6]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Balance trend */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Balance Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
