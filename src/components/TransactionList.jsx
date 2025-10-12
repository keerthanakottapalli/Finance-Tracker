export default function TransactionList({ transactions }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-bold mb-3 text-gray-800">Transactions</h2>
      <ul className="divide-y">
        {transactions.length === 0 && (
          <p className="text-gray-500 text-center py-4">No transactions yet</p>
        )}

        {transactions.map((t) => (
          <li key={t._id} className="py-2 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-700">{t.name}</p>
              <p className="text-sm text-gray-400">{new Date(t.date).toLocaleDateString()}</p>
            </div>
            <p
              className={`font-semibold ${
                t.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {t.type === "income" ? `+₹${t.amount}` : `-₹${t.amount}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
