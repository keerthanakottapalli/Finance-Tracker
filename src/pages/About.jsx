import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { token } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center pt-26 bg-gradient-to-b from-indigo-50 to-white text-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4"
      >
        Personal Finance Tracker 💸
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-700 text-lg max-w-3xl leading-relaxed mb-10"
      >
        We all work hard to earn money — to make our lives better, to fulfill small dreams,
        to enjoy the simple moments that matter.
        <br />
        <br />
        But in today’s fast and expensive world, managing money feels harder than earning it.
        Most of us don’t realize where our money actually goes — how much is spent on needs,
        wants, or impulsive buys — until it’s too late.
        <br />
        <br />
        <strong>Personal Finance Tracker</strong> is a simple yet powerful tool that helps you
        take control of your finances. It gives you clear visibility of your income, expenses,
        and savings — all in one place.
        <br />
        <br />
        Because when you understand your spending, you can normalize your expenses, set realistic
        goals, and turn your day dreams into achievable realities.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="space-x-4 mb-12"
      >
        {!token ? (
          <>
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <Link
            to="/home"
            className="bg-green-200 text-black px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Go to Dashboard
          </Link>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="text-gray-600 italic"
      >
        <p>“Track your spending. Build your dreams.”</p>
        <p className="text-sm mt-1">Because your small dreams deserve big plans.</p>
      </motion.div>
    </div>
  );
}
