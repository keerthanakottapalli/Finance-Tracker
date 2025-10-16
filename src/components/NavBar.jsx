import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initials = user && user.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const handleProfileClick = () => setOpen(o => !o);
  const handleLogin = () => { setOpen(false); navigate("/login"); };
  const handleLogout = () => {
    logout(); setOpen(false);
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex items-center space-x-4 ">
        <img className="h-20" src="https://tse1.mm.bing.net/th/id/OIP.nB4I43QqSwN727UhZyJxKQHaHa?pid=Api&P=0&h=220" alt="" />
        <h4 className="text-xl font-bold text-gray-800">Finance Tracker 💸</h4>
      </div>


      <div className="space-x-4 flex items-center">
        <Link to="/home" className={`${location.pathname === "/" ? "text-indigo-600 font-semibold" : "text-gray-700"} hover:text-indigo-500`}>Home</Link>
        <Link to="/analytics" className={`${location.pathname === "/analytics" ? "text-indigo-600 font-semibold" : "text-gray-700"} hover:text-indigo-500`}>Analytics</Link>
      </div>

      <div className="relative">
        <div onClick={handleProfileClick} className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold cursor-pointer select-none">
          {initials}
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg border z-50">
            {user ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-700">Signed in as <strong>{user.name}</strong></div>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
              </>
            ) : (
              <button onClick={handleLogin} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Login</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
