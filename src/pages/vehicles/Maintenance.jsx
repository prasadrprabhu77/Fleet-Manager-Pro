// src/pages/VehicleMaintenance.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function Maintenance() {
  const { id } = useParams(); // vehicleId from route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    type: "",
    cost: "",
    notes: "",
    nextDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("Vehicle ID is missing!");
      return;
    }

    try {
      await addDoc(collection(db, "vehicles", id, "maintenance"), {
        ...formData,
        cost: Number(formData.cost),
        createdAt: serverTimestamp(),
      });
      alert("Maintenance record added successfully!");
      navigate(`/vehicles/${id}`); // go back to vehicle details page
    } catch (error) {
      console.error("Error adding maintenance record: ", error);
      alert("Failed to add record.");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Maintenance Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="e.g. Oil Change"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Cost (₹)</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional details..."
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Next Service</label>
          <input
            type="date"
            name="nextDate"
            value={formData.nextDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Record
        </button>
      </form>
    </div>
  );
}

export default Maintenance;
