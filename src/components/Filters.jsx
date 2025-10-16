import React from "react";
import { Filter, Search, Calendar } from "lucide-react";

export default function Filters({ filters, setFilters }) {
  const months = [
    { name: "All", value: "All" },
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border border-gray-200">
      {/* Left Section: Filters */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <Filter className="text-gray-600 w-5 h-5" />
        {/* Month Filter */}
        <div className="flex items-center bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-200">
          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
          <select
            value={filters.month}
            onChange={(e) =>
              setFilters((f) => ({ ...f, month: e.target.value }))
            }
            className="focus:outline-none bg-transparent text-gray-700"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-200">
          <Filter className="w-4 h-4 text-gray-500 mr-2" />
          <select
            value={filters.type}
            onChange={(e) =>
              setFilters((f) => ({ ...f, type: e.target.value }))
            }
            className="focus:outline-none bg-transparent text-gray-700"
          >
            <option value="All">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* Right Section: Search Bar */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
          placeholder="Search by title or note..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white transition-all"
        />
      </div>
    </div>
  );
}
