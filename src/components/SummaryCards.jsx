import { ArrowUpCircle, ArrowDownCircle, Wallet2 } from "lucide-react";

export default function SummaryCards({ income, expense, balance }) {
  const data = [
    {
      title: "Income",
      amount: `₹${income}`,
      icon: <ArrowUpCircle className="w-8 h-8 text-green-600" />,
      bg: "from-green-100 to-green-50",
      text: "text-green-700",
    },
    {
      title: "Expense",
      amount: `₹${expense}`,
      icon: <ArrowDownCircle className="w-8 h-8 text-red-600" />,
      bg: "from-red-100 to-red-50",
      text: "text-red-700",
    },
    {
      title: "Balance",
      amount: `₹${balance}`,
      icon: <Wallet2 className="w-8 h-8 text-blue-600" />,
      bg: "from-blue-100 to-blue-50",
      text: "text-blue-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">
      {data.map((item) => (
        <div
          key={item.title}
          className={`p-6 rounded-2xl bg-gradient-to-r ${item.bg} shadow-md hover:shadow-xl transition-transform transform hover:scale-[1.03]`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-sm font-medium uppercase tracking-wide ${item.text}`}>
                {item.title}
              </h2>
              <p className="text-3xl font-bold mt-2 text-gray-800">{item.amount}</p>
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm">{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
