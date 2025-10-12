import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import SummaryCards from "./components/SummaryCards";
import TransactionList from "./components/TransactionList";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionModal from "./components/TransactionModel";
import useTransactions from "./hooks/useTransactions";

function App() {
  const { transactions, income, expense, balance, add, remove } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="p-4 max-w-5xl mx-auto">
        <SummaryCards income={income} expense={expense} balance={balance} />
        <TransactionList transactions={transactions} onDelete={remove} />
      </main>
      <AddTransactionForm onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <TransactionModal onClose={() => setIsModalOpen(false)} onAdd={add} />
      )}
    </div>
  );
}

export default App;
