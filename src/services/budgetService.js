import API from "./api";

// services/budgetService.js

// Instead of directly exporting, create functions that accept token
export const getBudget = (token) =>
  API.get("/budgets", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addBudget = (transaction, token) =>
  API.post("/budgets", transaction, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteBudget = (id, token) =>
  API.delete(`/budgets/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });