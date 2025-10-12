import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SummaryCards from './components/SummaryCards';
import TransactionList from './components/TransactionList';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionModal from './components/TransactionModel';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 💰 State to hold all transactions
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Grocery Shopping", amount: -1200, date: "Oct 9" },
    { id: 2, name: "Salary", amount: 45000, date: "Oct 1" },
    { id: 3, name: "Netflix", amount: -499, date: "Oct 4" },
  ]);

  // ➕ Add new transaction
  const handleAddTransaction = (newTransaction) => {
    setTransactions([
      { id: Date.now(), ...newTransaction },
      ...transactions,
    ]);
  };

  // 📊 Calculate Summary
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <main className="p-4 max-w-5xl mx-auto">
        <SummaryCards income={income} expense={expense} balance={balance} />
        <TransactionList transactions={transactions} />
      </main>

      <AddTransactionForm onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <TransactionModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTransaction}
        />
      )}
    </div>
  );
}

export default App;
