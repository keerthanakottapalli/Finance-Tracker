import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "./components/NavBar";
import TransactionModal from "./components/TransactionModel";
import useTransactions from "./hooks/useTransactions";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/About";
import BudgetTracker from "./components/BudgetTracker";
import BudgetPage from "./pages/BudgetPage";

function AnimatedRoutes() {
  const location = useLocation();
  const { filteredTransactions, add, remove, income, expense, balance, filters, setFilters } =
    useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.history.replaceState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      if (!localStorage.getItem("token")) {
        window.location.href = "/login";
      }
    });
  }, [location]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location} key={location.pathname}>
            
            <Route path="/" element={<AboutPage />} />
            <Route
              path="/home"
              element={
                <Home
                  income={income}
                  expense={expense}
                  balance={balance}
                  filters={filters}
                  setFilters={setFilters}
                  filteredTransactions={filteredTransactions}
                  remove={remove}
                  openModal={() => setIsModalOpen(true)}
                />
              }
            />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/budget" element={< BudgetPage/>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {isModalOpen && (
        <TransactionModal onClose={() => setIsModalOpen(false)} onAdd={add} />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
}

function MainApp() {
  const location = useLocation();

  // ✅ Hide navbar on login/signup
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <NavBar />}
      <AnimatedRoutes />
    </div>
  );
}

export default App;
