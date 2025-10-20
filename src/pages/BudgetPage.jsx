import React from "react";
import useTransactions from "../hooks/useTransactions";
import BudgetTracker from "../components/BudgetTracker";
import { useAuth } from "../context/AuthContext";

export default function BudgetPage() {
  const { transactions } = useTransactions();
  const { user } = useAuth();

  return (
    <div className="p-6">
      <BudgetTracker transactions={transactions} userToken={user?.token} />
    </div>
  );
}
