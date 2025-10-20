import { useEffect, useState, useMemo } from "react";
import { getTransactions, addTransaction, deleteTransaction } from "../services/transactionService";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

export default function useTransactions() {
  const { token } = useAuth(); // ✅ Get token from context
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    month: "All",
    type: "All",
    category: "All",
    search: "",
  });

  // Fetch transactions from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTransactions(token); // ✅ Pass token
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // Add new transaction
  const add = async (transaction) => {
    try {
      const { data } = await addTransaction(transaction, token); // ✅ Pass token
      setTransactions((prev) => [data, ...prev]);
    } catch (err) {
      console.error("Failed to add transaction:", err);
    }
  };

  const update = async (id, updatedTransaction) => {
  try {
    const { data } = await API.put(`/transactions/${id}`, updatedTransaction);
    setTransactions(transactions.map(tx => tx._id === id ? data : tx));
    alert("Transaction updated successfully!");
  } catch (err) {
    console.error("Update transaction failed:", err);
    alert("Failed to update transaction.");
  }
};


  // Remove transaction
  const remove = async (id) => {
    try {
      await deleteTransaction(id, token); // ✅ Pass token
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete transaction:", err);
    }
  };

  // Calculations
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesMonth =
        filters.month === "All" ||
        new Date(t.date).getMonth() + 1 === Number(filters.month);

      const matchesType =
        filters.type === "All" || t.type === filters.type;

      const title = t.name || t.title || "";
      const note = t.note || "";

      const matchCategory = filters.category === "All" || t.category === filters.category 

      const matchesSearch =
        filters.search === "" ||
        title.toLowerCase().includes(filters.search.toLowerCase()) ||
        note.toLowerCase().includes(filters.search.toLowerCase());

      return matchesMonth && matchesType && matchCategory && matchesSearch;
    });
  }, [transactions, filters]);

  return {
    transactions,
    filteredTransactions,
    loading,
    add,
    remove,
    update,
    filters,
    setFilters,
    income,
    expense,
    balance,
  };
}
