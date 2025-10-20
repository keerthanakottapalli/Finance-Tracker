import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import useBudgets from "../hooks/useBudgets";

const BudgetTracker = ({ transactions }) => {
  const { budgets, add, remove, loading } = useBudgets(); // use custom hook
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  const monthlySpending = useMemo(() => {
    const spending = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        spending[t.category] = (spending[t.category] || 0) + Number(t.amount);
      }
    });
    return spending;
  }, [transactions]);

  const progressData = budgets.map((b) => {
    const spent = monthlySpending[b.category] || 0;
    const percent = Math.min((spent / b.limit) * 100, 100);
    return { ...b, spent, percent };
  });

  const handleSaveBudget = async (e) => {
    e.preventDefault();
    if (!category || !limit) return toast.error("Please fill all fields");

    try {
      await add({ category, limit: Number(limit) });
      toast.success("Budget added!");
      setShowModal(false);
      setCategory("");
      setLimit("");
    } catch (err) {
      toast.error("Failed to add budget", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
      toast.info("Budget removed");
    } catch (err) {
      toast.error("Failed to delete", err);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading budgets...</p>;

  return (
    <div className="pt-20 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">💰 Budget Tracker</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-black px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Budget
        </button>
      </div>

      {/* Budget Cards */}
      {progressData.length === 0 ? (
        <p className="text-gray-500">No budgets added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {progressData.map((b) => (
            <div
              key={b._id}
              className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition space-y-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">{b.category}</h3>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>

              <div className="text-sm text-gray-600">
                ₹{b.spent} / ₹{b.limit}
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-lg overflow-hidden">
                <div
                  className={`h-3 rounded-lg transition-all duration-500 ${
                    b.spent > b.limit ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${b.percent}%` }}
                ></div>
              </div>

              {b.spent > b.limit && (
                <p className="text-red-500 text-sm font-medium">
                  ⚠️ Over budget in {b.category}!
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white/85 flex justify-center items-center">
          <div className="bg-purple-100 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Set Budget</h3>
            <form onSubmit={handleSaveBudget} className="space-y-4">
              <select
                className="border p-2 rounded-lg w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option>Food</option>
                <option>Travel</option>
                <option>Rent</option>
                <option>Bills</option>
                <option>Shopping</option>
                <option>Investment</option>
                <option>Salary</option>
                <option>Other</option>
              </select>

              <input
                type="number"
                placeholder="Monthly Limit (₹)"
                className="border p-2 rounded-lg w-full"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-black hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetTracker;
