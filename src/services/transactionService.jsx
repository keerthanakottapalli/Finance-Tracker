import API from "./api";

export const getTransactions = () => API.get("/transactions");
export const addTransaction = (transaction) => API.post("/transactions", transaction);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
