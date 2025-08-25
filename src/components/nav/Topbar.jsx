// src/components/nav/Topbar.jsx
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon, User, LogOut, Menu, X } from "lucide-react";
import { toggleTheme } from "../../store/themeSlice";
import { useAuth } from "../../pages/Auth/AuthProvider";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const { user } = useAuth(); 
  const [open, setOpen] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header
      className={`h-16 fixed top-0 left-0 right-0  z-20 border-b flex items-center justify-between px-4 sm:px-8
      transition-colors duration-500
      ${
        theme === "dark"
          ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800 border-gray-800 text-white"
          : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 border-transparent text-white"
      }`}
    >
      {/* Brand + Nav */}
      <div className="flex items-center gap-4 sm:gap-10">
        {/* Brand */}
        <h1
          className={`text-lg sm:text-xl font-bold tracking-wide drop-shadow-md`}
        >
          Fleet Manager Pro
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-md font-medium">
  {["Home", "About", "Contact"].map((item) => (
    <Link
      key={item}
      to={item === "Home" ? "/dashboard" : `/${item.toLowerCase()}`}
      className="relative text-base font-medium group"
    >
      <span className="group-hover:text-yellow-300 transition-colors">
        {item}
      </span>
      {/* underline effect */}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
    </Link>
  ))}
</nav>

      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4 sm:gap-6 relative">
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`p-2 rounded-full shadow-md border border-white/20 hover:scale-105 transition-transform`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <User size={20} />
            <span className="font-medium text-sm hidden sm:inline">
              {user?.name || "User"}
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden
                ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }
              `}
            >
              <div className="p-4 flex flex-col gap-2">
                <p className="font-semibold">{user?.name}</p>
                <p className="font-mono text-xs truncate opacity-80">
                  {user?.email}
                </p>
                <p className="text-sm">
                  Role:{" "}
                  <span className="font-medium text-blue-500">
                    {user?.role}
                  </span>
                </p>

                <button
                  onClick={handleLogout}
                  className="mt-3 flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-100 hover:text-red-700 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-16 left-0 w-full md:hidden flex flex-col items-start gap-4 px-6 py-4 z-10 shadow-md
          ${
            theme === "dark"
              ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
              : "bg-gradient-to-b from-indigo-500 to-purple-600 text-white"
          }`}
        >
          {["Home", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="w-full py-2 hover:text-yellow-300 transition"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
