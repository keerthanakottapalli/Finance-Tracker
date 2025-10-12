import React from 'react'

function NavBar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Finance Tracker 💸</h1>
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
        VR
      </div>
    </nav>
  )
}

export default NavBar