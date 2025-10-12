export default function SummaryCards({ income, expense, balance }) {
  const data = [
    { title: "Income", amount: `₹${income}`, color: "bg-green-100 text-green-700" },
    { title: "Expense", amount: `₹${expense}`, color: "bg-red-100 text-red-700" },
    { title: "Balance", amount: `₹${balance}`, color: "bg-blue-100 text-blue-700" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      {data.map((item) => (
        <div
          key={item.title}
          className={`p-4 rounded-xl shadow-sm ${item.color}`}
        >
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-2xl font-bold mt-2">{item.amount}</p>
        </div>
      ))}
    </div>
  );
}
