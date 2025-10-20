import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileModal from "./ProfileModal"; // ✅ new modal component

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuth(); // ✅ make sure setUser exists in your AuthContext
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleProfileClick = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-50 px-6 py-3">
        <div className="flex items-center space-x-4">
          <img
            className="h-12"
            src="https://tse1.mm.bing.net/th/id/OIP.nB4I43QqSwN727UhZyJxKQHaHa?pid=Api&P=0&h=220"
            alt=""
          />
          <h4 className="text-lg font-bold text-gray-800">
            Finance Tracker 💸
          </h4>
        </div>

        <div className="space-x-4 flex items-center">
          <Link
            to="/home"
            className={`${
              location.pathname === "/home"
                ? "text-indigo-600 font-semibold"
                : "text-gray-700"
            } hover:text-indigo-500`}
          >
            Home
          </Link>
          <Link
            to="/analytics"
            className={`${
              location.pathname === "/analytics"
                ? "text-indigo-600 font-semibold"
                : "text-gray-700"
            } hover:text-indigo-500`}
          >
            Analytics
          </Link>
          <Link
            to="/budget"
            className={`${
              location.pathname === "/budget"
                ? "text-indigo-600 font-semibold"
                : "text-gray-700"
            } hover:text-indigo-500`}
          >
            Budget
          </Link>
        </div>

        <div className="relative">
          <img
            src={
              user?.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User"
            className="w-14 h-14 rounded-full object-cover cursor-pointer border-2 border-indigo-400"
            onClick={handleProfileClick}
          />

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50">
              <button
                onClick={() => {
                  setProfileOpen(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Profile Modal */}
      {profileOpen && (
        <ProfileModal
          onClose={() => setProfileOpen(false)}
          user={user}
          setUser={setUser}
        />
      )}
    </>
  );
}

export default NavBar;
