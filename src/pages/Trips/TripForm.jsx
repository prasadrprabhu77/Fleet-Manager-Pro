import { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthProvider"; // your auth hook
import {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";

function TripForm() {
  const { user } = useAuth(); // driver info
  const theme = useSelector(state => state.theme.mode)
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [tripData, setTripData] = useState({
    from: "",
    to: "",
    startDate: "",
    endDate: "",
    Km: ""
  });

  // Fetch vehicles
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const snapshot = await getDocs(collection(db, "vehicles"));
        const vehicleList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVehicles(vehicleList);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    }
    fetchVehicles();
  }, []);

  const handleVehicleChange = (e) => {
    const vehicleId = e.target.value;
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    setSelectedVehicle(vehicle || null);
  };

  const handleChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVehicle) {
      alert("Please select a vehicle");
      return;
    }

    try {
      const trip = {
        driverId: user.uid,
        driverEmail: user.email,
        vehicleId: selectedVehicle.id,
        vehicleName: selectedVehicle.name,
        vehicleNumber: selectedVehicle.number,
        from: tripData.from,
        to: tripData.to,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        Kilometer: tripData.Km,
        createdAt: new Date().toISOString(),
      };

      // Save under vehicle -> trips
      await addDoc(collection(db, "vehicles", selectedVehicle.id, "trips"), trip);

      // Save under driver -> trips
      await addDoc(collection(db, "drivers", user.uid, "trips"), trip);

      await addDoc(collection(db, "trips"), trip);

      alert("Trip added successfully ✅");
      setTripData({ from: "", to: "", startDate: "", endDate: "",Km: "" });
      setSelectedVehicle(null);
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Failed to save trip");
    }
  };

  return (
    <div className={`p-6 max-w-lg mx-auto ${theme == "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"}  shadow-md rounded-lg`}>
      <h2 className="text-xl font-bold mb-4">Add Trip Log</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Vehicle Dropdown */}
        <div>
          <label className="block text-sm font-medium">Select Vehicle</label>
          <select
            onChange={handleVehicleChange}
            className={`w-full border rounded p-2 ${theme == "dark" ? "text-white" : "text-black"}`}
            value={selectedVehicle?.id || ""}
          >
            <option value="">-- Choose Vehicle --</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} - {v.number}
              </option>
            ))}
          </select>
        </div>

        {/* Readonly details */}
        {selectedVehicle && (
          <div className="space-y-2">
            <p>
              <strong>Vehicle:</strong> {selectedVehicle.name} (
              {selectedVehicle.number})
            </p>
            <p>
              <strong>Driver Email:</strong> {user.email}
            </p>
          </div>
        )}

        {/* Trip details */}
        <div>
          <label className="block text-sm font-medium">From</label>
          <input
            type="text"
            name="from"
            value={tripData.from}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">To</label>
          <input
            type="text"
            name="to"
            value={tripData.to}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Km</label>
          <input
            type="number"
            name="Km"
            value={tripData.Km}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            value={tripData.startDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={tripData.endDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Trip
        </button>
      </form>
    </div>
  );
}

export default TripForm;
