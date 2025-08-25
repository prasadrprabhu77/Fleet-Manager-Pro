// src/pages/Trip/TripList.jsx
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useSelector } from "react-redux";

function TripList() {
  const [trips, setTrips] = useState([]);
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const q = query(collection(db, "trips"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tripData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrips(tripData);
    });

    return () => unsubscribe();
  }, []);

  // Theme-based classes
  const themeClass = {
    dark: {
      container: "bg-gray-800 text-gray-100",
      table: "bg-gray-700 text-gray-100 border-gray-600",
      header: "bg-gray-900 text-gray-200",
      rowHover: "hover:bg-gray-600",
      noTrips: "text-gray-400",
    },
    light: {
      container: "bg-gray-100 text-gray-800",
      table: "bg-white text-gray-800 border-gray-200",
      header: "bg-gray-100 text-gray-900",
      rowHover: "hover:bg-gray-50",
      noTrips: "text-gray-500",
    },
  };

  return (
    <div className={`p-6 min-h-screen ${themeClass[theme].container}`}>
      <h2 className="text-xl font-semibold mb-4">Trip List</h2>
      {trips.length === 0 ? (
        <p className={themeClass[theme].noTrips}>No trips found</p>
      ) : (
        <div className="overflow-x-auto">
          <table
            className={`min-w-full rounded-lg shadow border ${themeClass[theme].table}`}
          >
            <thead>
              <tr className={`${themeClass[theme].header} text-left`}>
                <th className="py-2 px-4 border-b">Trip ID</th>
                <th className="py-2 px-4 border-b">Vehicle</th>
                <th className="py-2 px-4 border-b">From</th>
                <th className="py-2 px-4 border-b">To</th>
                <th className="py-2 px-4 border-b">Kilometer</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Driver</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id} className={`${themeClass[theme].rowHover}`}>
                  <td className="py-2 px-4 border-b">{trip.id}</td>
                  <td className="py-2 px-4 border-b">
                    {trip.vehicleName} ({trip.vehicleNumber})
                  </td>
                  <td className="py-2 px-4 border-b">{trip.from}</td>
                  <td className="py-2 px-4 border-b">{trip.to}</td>
                  <td className="py-2 px-4 border-b">{trip.Kilometer}</td>
                  <td className="py-2 px-4 border-b">{trip.createdAt}</td>
                  <td className="py-2 px-4 border-b">{trip.driverEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TripList;
