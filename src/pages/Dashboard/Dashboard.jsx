// src/pages/Dashboard.jsx
import { NavLink } from "react-router-dom";
import { Truck, Users, NotebookTabs } from "lucide-react";
import { useAuth } from "../Auth/AuthProvider";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;
  const theme = useSelector((state) => state.theme.mode);

  const cards = [
    {
      title: "Trip Log",
      icon: <NotebookTabs size={28} />,
      path: "/triplog",
      roles: ["admin", "manager", "driver"],
      color: "from-pink-500 via-red-400 to-orange-400",
    },
    {
      title: "Vehicles",
      icon: <Truck size={28} />,
      path: "/vehicleList",
      roles: ["admin", "manager", "driver"],
      color: "from-blue-500 via-indigo-400 to-cyan-400",
    },
    {
      title: "User Management",
      icon: <Users size={28} />,
      path: "/userManagement",
      roles: ["admin", "manager"],
      color: "from-green-500 via-emerald-400 to-lime-400",
    },
  ];

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 flex flex-col gap-8 transition-colors
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
            : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 text-gray-900"
        }`}
    >
      {/* Hero Section */}
      <div className="relative flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl h-40 sm:h-64">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1609059975971-96e6b63d6a1b?auto=format&fit=crop&w=1950&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.5)",
          }}
        ></div>
        {/* Overlay gradient for vibrance */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 via-purple-600/40 to-pink-500/50"></div>
        <h1
          className={`relative text-2xl sm:text-4xl md:text-5xl font-extrabold text-center px-2 sm:px-4 animate-fadeIn drop-shadow-lg
            ${theme === "dark" ? "text-white" : "text-white"}`}
        >
          Welcome, {user?.email || "User"}!
        </h1>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 flex-1">
        {cards.map(
          (card) =>
            card.roles.includes(role) && (
              <NavLink
                key={card.title}
                to={card.path}
                className={`
                  relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl shadow-xl
                  transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                  bg-gradient-to-br ${card.color} text-white
                `}
              >
                <div className="p-3 bg-white/20 rounded-full shadow-inner">
                  {card.icon}
                </div>
                <span className="text-lg font-semibold">{card.title}</span>
                <span className="absolute -bottom-2 right-2 w-16 h-1 bg-white/60 rounded-full animate-pulse"></span>
              </NavLink>
            )
        )}
      </div>

      {/* Footer Image */}
      <div className="mt-6 flex justify-center px-2">
        <img
          src="https://images.unsplash.com/photo-1581091215368-1691aa2d1b42?auto=format&fit=crop&w=1950&q=80"
          alt="Logistics"
          className="w-full max-w-4xl rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
}
