import API from "./api";

// Instead of directly exporting, create functions that accept token
export const getTransactions = (token) =>
  API.get("/transactions", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addTransaction = (transaction, token) =>
  API.post("/transactions", transaction, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTransaction = (id, token) =>
  API.delete(`/transactions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
