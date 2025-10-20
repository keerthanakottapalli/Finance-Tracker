import React from "react";
export default function TransactionModal({ onClose, onAdd }) {
  const [form, setForm] = React.useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
    repeatMonthly: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };


  // console.log(form.repeatMonthly, "cliked")

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      name: form.title,
      amount: +form.amount,
      type: form.type,
      category: form.category,
      repeatMonthly: form.repeatMonthly,
      date: form.date ? new Date(form.date).toISOString() : new Date().toISOString(),
    };

    onAdd(newTransaction);
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-black-800 mb-4">
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          {/* Category Field */}
          <div>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-lg p-2 text-gray-700 w-full"
            >
              <option value="">Select Category</option>

              {form.type === "income" ? (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investment">Investment</option>
                  <option value="Other">Other</option>
                </>
              ) : (
                <>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Rent">Rent</option>
                  <option value="Bills">Bills</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Other">Other</option>
                </>
              )}
            </select>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="repeatMonthly"
                checked={form.repeatMonthly}
                onChange={handleChange}
              />
              <span className="text-gray-700">Repeat Monthly</span>
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-black py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
