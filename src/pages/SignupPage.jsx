import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      const payload = res.data || {};
      const token = payload.token || payload.jwt || "";
      const user = payload.user || {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
      };
      if (!token) return navigate("/login");
      login(user, token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full text-gray py-3 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6 text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Illustration / Text */}
      <div className="hidden md:flex flex-1 text-gray flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4">Start Your Journey 💚</h1>
        <p className="text-lg max-w-md text-center leading-relaxed opacity-90">
          Begin tracking your income and expenses with ease. Build better financial habits 
          and let your data tell your money story.
        </p>
        <img
          src="https://tse3.mm.bing.net/th/id/OIP.BaIrNFYYtvEuA-PLiIIyIgHaHa?pid=Api&P=0&h=220"
          alt="Finance Illustration"
          className="w-80 mt-10 drop-shadow-lg"
        />
      </div>
    </div>
  );
}
