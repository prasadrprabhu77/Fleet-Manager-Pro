// src/pages/Trip/TripLog.jsx
import React from "react";
import { useAuth } from "../Auth/AuthProvider";
import TripForm from "./TripForm";
import TripList from "./TripList";
import { useSelector } from "react-redux";

function TripLog() {
  const { user } = useAuth();
  const theme = useSelector(state => state.theme.mode)

  // Assuming you stored role in Firestore under user doc and passed to context
  const role = user?.role; // role: "admin", "manager", "driver", etc.

  return (
    <div className={`p-6 ${theme == "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
      <h1 className="text-2xl font-bold mb-6">Trip Log</h1>

      {/* Show TripForm only if user is not admin/manager */}
      {role !== "admin" && role !== "manager" && (
        <div className="mb-8">
          <TripForm />
        </div>
      )}

      {/* TripList is visible for everyone */}
      {role != "driver" &&
      <TripList />}
    </div>
  );
}

export default TripLog;
