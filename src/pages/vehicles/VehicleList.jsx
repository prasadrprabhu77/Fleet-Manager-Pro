import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import VehicleForm from "./VehicleForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../Auth/AuthProvider";

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.mode);
  const { user } = useAuth();
  const role = user.role;

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vehicles"));
        const vehicleData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVehicles(vehicleData);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };
    fetchVehicles();
  }, []);

  const handleAdd = (vehicle) => {
    setVehicles((prev) => [...prev, vehicle]);
  };

  const themeCard = theme === "dark" 
    ? "bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600"
    : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100";

  const themeContainer = theme === "dark"
    ? "bg-gray-800 text-gray-100"
    : "bg-gray-100 text-gray-900";

  return (
    <div className={`min-h-screen ${themeContainer} p-6`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vehicle List</h1>
      </div>

      {/* Vehicle Form */}
      {role !== "driver" && (
        <div className="mb-6 p-4 rounded-lg shadow-md">
          <VehicleForm onAdd={handleAdd} />
        </div>
      )}

      {/* Vehicle Grid */}
      {vehicles.length === 0 ? (
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
          No vehicles found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className={`border rounded-xl p-4 flex flex-col justify-between shadow-md transition ${themeCard}`}
            >
              <div>
                <p className="font-bold text-lg">{v.name}</p>
                <p className="text-sm">{v.type}</p>
              </div>
              <button
                onClick={() => navigate(`/vehicles/${v.id}`)}
                className={`mt-4 px-4 py-2 rounded-lg font-medium transition ${
                  theme === "dark"
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleList;
