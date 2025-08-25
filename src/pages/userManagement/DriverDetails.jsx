// src/pages/UserManagement/DriverDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function DriverDetails() {
  const { id } = useParams(); // driver uid
  const theme = useSelector((state) => state.theme.mode);
  const [driver, setDriver] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchDriverAndTrips = async () => {
      try {
        // fetch driver profile from users collection
        const driverRef = doc(db, "users", id);
        const driverSnap = await getDoc(driverRef);

        if (driverSnap.exists()) {
          setDriver({ id: driverSnap.id, ...driverSnap.data() });
        } else {
          console.log("No such driver!");
        }

        // fetch driver trips from drivers collection
        const tripsRef = collection(db, "drivers", id, "trips");
        const tripsSnap = await getDocs(tripsRef);
        const tripsList = tripsSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setTrips(tripsList);
      } catch (err) {
        console.error("Error fetching driver/trips:", err);
      }
    };

    fetchDriverAndTrips();
  }, [id]);

  if (!driver) return <p className="p-4">Loading driver details...</p>;

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Driver Details</h1>

      {/* Driver Info */}
      <div
        className={`p-4 border rounded ${
          theme === "dark" ? "bg-gray-700" : "bg-white"
        }`}
      >
        <p><strong>Email:</strong> {driver.email}</p>
        <p><strong>Role:</strong> {driver.role}</p>
      </div>

      {/* Trips */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Trips</h2>
      {trips.length === 0 ? (
        <p>No trips found for this driver.</p>
      ) : (
        <div className="space-y-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className={`p-4 border rounded ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <p><strong>Vehicle:</strong> {trip.vehicleName} ({trip.vehicleNumber})</p>
              <p><strong>From:</strong> {trip.from} → <strong>To:</strong> {trip.to}</p>
              <p><strong>Start:</strong> {trip.startDate}</p>
              <p><strong>End:</strong> {trip.endDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
