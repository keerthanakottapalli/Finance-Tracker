import React from "react";
import SummaryCards from "../components/SummaryCards";
import Filters from "../components/Filters";
import Charts from "../components/Charts";
import TransactionList from "../components/TransactionList";
import AddTransactionForm from "../components/AddTransactionForm";

export default function Home({
    income,
    expense,
    balance,
    filters,
    setFilters,
    filteredTransactions,
    remove,
    openModal,
}) {
    return (
        <div className="min-h-screen ">
            <main className="max-w-5xl mx-auto pt-20">
                <SummaryCards income={income} expense={expense} balance={balance} />
                <Filters filters={filters} setFilters={setFilters} />
                <Charts transactions={filteredTransactions} />
                <TransactionList transactions={filteredTransactions} onRemove={remove} />
                <AddTransactionForm onClick={openModal} />
            </main>
        </div>

    );
}
