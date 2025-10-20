import { useEffect, useState } from "react";
import { getBudget, addBudget, deleteBudget } from "../services/budgetService";
import { useAuth } from "../context/AuthContext";

export default function useBudgets() {
    const { token } = useAuth();
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await getBudget(token); // ✅ Pass token
            setBudgets(data);
          } catch (err) {
            console.error("Failed to fetch:", err);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, [token]);

      const add = async (budget) => {
          try {
            const { data } = await addBudget(budget, token); // ✅ Pass token
            setBudgets((prev) => [data, ...prev]);
          } catch (err) {
            console.error("Failed to add budget:", err);
          }
        };
      
        // Remove transaction
        const remove = async (id) => {
          try {
            await deleteBudget(id, token); // ✅ Pass token
            setBudgets((prev) => prev.filter((t) => t._id !== id));
          } catch (err) {
            console.error("Failed to delete budget:", err);
          }
        };

    return {add, remove, budgets, loading};
}