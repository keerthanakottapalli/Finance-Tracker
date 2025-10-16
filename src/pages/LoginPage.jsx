import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const payload = res.data || {};
      const token = payload.token || payload.jwt || "";
      const user = payload.user || {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
      };
      if (!token) throw new Error("No token in response");
      login(user, token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-emerald-50">
      {/* Left Section - Illustration / Text */}
      <div className="hidden md:flex flex-1  text-brown flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Finance Tracker</h1>
        <p className="text-lg max-w-md text-center leading-relaxed opacity-90">
          Take control of your money — track expenses, visualize your spending, and save for what truly matters.
          Because your small dreams deserve big plans.
        </p>
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.Gm6dK8DkwKpHmB-IM1FwWAHaE8?pid=Api&P=0&h=220"
          alt="Finance Illustration"
          className="w-80 mt-10 drop-shadow-lg"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 ">
        <div className="bg-red-50 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-black-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-black-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-black-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
