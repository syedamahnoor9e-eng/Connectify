import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [search, setSearch] = useState("")
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white border-b border-gray-700 fixed top-0 left-0 z-50 w-full">
      <div className="flex justify-between py-4 px-6 items-center">
        {/* Logo */}
        <div className="items-center flex gap-2">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-xl font-medium">C</span>
          </div>
          <h1 className="text-xl font-semibold">Connectify</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Connectify..."
              className="w-full bg-gray-700 focus:ring-blue-500 focus:ring-2 focus:outline-none pl-10 text-white rounded-lg pr-4 py-2 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {token ? (
            <>
              <button
                onClick={() => navigate(`/profile/${userId}`)}
                className="flex gap-2 items-center hover:text-blue-400 transition-colors">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => navigate("/notifications")}
                className="flex gap-2 items-center hover:text-blue-400 transition-colors">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex gap-2 items-center hover:text-red-400 transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;