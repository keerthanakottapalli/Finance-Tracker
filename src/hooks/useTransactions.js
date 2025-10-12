import { useEffect, useState } from "react";
import { getTransactions, addTransaction, deleteTransaction } from "../services/TransactionService";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const add = async (transaction) => {
    const { data } = await addTransaction(transaction);
    setTransactions((prev) => [data, ...prev]);
  };

  const remove = async (id) => {
    await deleteTransaction(id);
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  // ✅ Fix: Use type to separate income/expense
  const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return { transactions, loading, add, remove, income, expense, balance };
}

