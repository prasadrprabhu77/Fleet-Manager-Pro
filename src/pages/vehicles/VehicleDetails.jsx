// src/pages/VehicleManagement/VehicleDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [trips, setTrips] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const docRef = doc(db, "vehicles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setVehicle({ id: docSnap.id, ...docSnap.data() });

        const tripsRef = collection(db, "vehicles", id, "trips");
        const tripsSnap = await getDocs(tripsRef);
        setTrips(tripsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        const maintenanceRef = collection(db, "vehicles", id, "maintenance");
        const maintenanceSnap = await getDocs(maintenanceRef);
        setMaintenanceLogs(maintenanceSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching vehicle data:", err);
      }
    };
    fetchVehicleData();
  }, [id]);

  if (!vehicle) return <p className="p-4">Loading vehicle details...</p>;

  const generateReport = (type) => {
    let content = `
      <h1>Vehicle Report</h1>
      <h2>Vehicle Info</h2>
      <p><strong>Name:</strong> ${vehicle.name}</p>
      <p><strong>Type:</strong> ${vehicle.type}</p>
      <p><strong>Number:</strong> ${vehicle.number}</p>
      <p><strong>Model:</strong> ${vehicle.model}</p>
    `;

    if (type === "trips") {
      content += "<h2>Trips Report</h2>";
      if (trips.length > 0) {
        content += `<table border="1" cellpadding="5" cellspacing="0">
          <tr>
            <th>#</th>
            <th>Driver</th>
            <th>From</th>
            <th>To</th>
            <th>Start</th>
            <th>End</th>
            <th>Kilometer</th>
          </tr>`;
        trips.forEach((trip, i) => {
          content += `<tr>
            <td>${i + 1}</td>
            <td>${trip.driverEmail || "-"}</td>
            <td>${trip.from || "-"}</td>
            <td>${trip.to || "-"}</td>
            <td>${trip.startDate || "-"}</td>
            <td>${trip.endDate || "-"}</td>
            <td>${trip.Kilometer || "-"}</td>
          </tr>`;
        });
        content += "</table>";
      } else content += "<p>No trips available</p>";
    }

    if (type === "maintenance") {
      content += "<h2>Maintenance Report</h2>";
      if (maintenanceLogs.length > 0) {
        content += `<table border="1" cellpadding="5" cellspacing="0">
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Notes</th>
            <th>Date</th>
            <th>Next Service</th>
            <th>Cost</th>
          </tr>`;
        maintenanceLogs.forEach((log, i) => {
          content += `<tr>
            <td>${i + 1}</td>
            <td>${log.type || "-"}</td>
            <td>${log.notes || "-"}</td>
            <td>${log.date || "-"}</td>
            <td>${log.nextDate || "-"}</td>
            <td>${log.cost || "-"}</td>
          </tr>`;
        });
        content += "</table>";
      } else content += "<p>No maintenance logs available</p>";
    }

    const blob = new Blob([content], { type: "application/vnd.ms-word" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Vehicle_${vehicle.id}_${type}_Report.doc`;
    link.click();
  };

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-2xl font-bold mb-4">Vehicle Details</h1>

      <div className={`p-4 border rounded ${theme === "dark" ? "bg-gray-700" : "bg-white"}`}>
        <p><strong>Name:</strong> {vehicle.name}</p>
        <p><strong>Type:</strong> {vehicle.type}</p>
        <p><strong>Number:</strong> {vehicle.number}</p>
        <p><strong>Model:</strong> {vehicle.model}</p>
      </div>

      <div className="mt-4">
        <Link to={`/vehicles/${id}/maintenance`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Maintenance</button>
        </Link>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => generateReport("trips")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download Trips Report
        </button>
        <button
          onClick={() => generateReport("maintenance")}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Download Maintenance Report
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Trips</h2>
      {trips.length === 0 ? <p>No trips found for this vehicle.</p> : (
        <div className="space-y-3">
          {trips.map((trip) => (
            <div key={trip.id} className={`p-4 border rounded ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              <p><strong>Driver:</strong> {trip.driverEmail}</p>
              <p><strong>From:</strong> {trip.from} → <strong>To:</strong> {trip.to}</p>
              <p><strong>Start:</strong> {trip.startDate}</p>
              <p><strong>End:</strong> {trip.endDate}</p>
              <p><strong>Kilometer:</strong> {trip.Kilometer}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">Maintenance Logs</h2>
      {maintenanceLogs.length === 0 ? <p>No maintenance records found.</p> : (
        <div className="space-y-3">
          {maintenanceLogs.map((log) => (
            <div key={log.id} className={`p-4 border rounded ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              <p><strong>Service Type:</strong> {log.type}</p>
              <p><strong>Description:</strong> {log.notes}</p>
              <p><strong>Date:</strong> {log.date}</p>
              {log.nextDate && <p><strong>Next Service:</strong> {log.nextDate}</p>}
              {log.cost && <p><strong>Cost:</strong> {log.cost}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleDetails;
