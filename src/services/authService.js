import axios from "axios";

const API = "http://localhost:5000/api";

export const register = (data) => axios.post(`${API}/auth/register`, data);
export const login = (data) => axios.post(`${API}/auth/login`, data);
