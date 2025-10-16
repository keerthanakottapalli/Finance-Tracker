import React, { useState } from "react";

export default function TransactionList({ transactions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentTransactions = transactions.slice(indexOfFirst, indexOfLast);

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-5 text-gray-800">Transactions</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-200">
              <th className="py-3 px-5 font-semibold">Name</th>
              <th className="py-3 px-5 font-semibold">Date</th>
              <th className="py-3 px-5 font-semibold">Type</th>
              <th className="py-3 px-5 font-semibold text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {currentTransactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No transactions yet
                </td>
              </tr>
            ) : (
              currentTransactions.map((t) => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-50 transition-all rounded-lg shadow-sm my-2"
                  style={{
                    borderBottom: "8px solid transparent", // Creates that nice spacing
                  }}
                >
                  <td className="py-4 px-5 font-medium text-gray-800">
                    {t.name}
                  </td>
                  <td className="py-4 px-5 text-gray-500">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`px-3 py-1 text-sm font-medium ${
                        t.type === "income"
                          ? " text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-5 text-right font-bold ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type === "income" ? `+₹${t.amount}` : `-₹${t.amount}`}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {transactions.length > rowsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>

          <span className="text-gray-600">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium bg-gray-200 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
