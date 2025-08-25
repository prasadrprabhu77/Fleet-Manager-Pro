// src/layouts/MainLayout.jsx
import Topbar from "../components/nav/Topbar";
import { useAuth } from "../pages/Auth/AuthProvider";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const { theme } = useAuth();

  return (
    <div
      className={`flex flex-col min-h-screen w-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900"
      }`}
    >
      {/* Topbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 h-16 w-full shadow-md backdrop-blur-sm ${
          theme === "dark"
            ? "bg-gray-900/95 text-white"
            : "bg-white/95 text-gray-900"
        }`}
      >
        <Topbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-10 w-full p-6">
        <Outlet />
      </main>
    </div>
  );
}
