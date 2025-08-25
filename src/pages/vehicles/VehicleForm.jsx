import { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../Auth/AuthProvider";
import { useSelector } from "react-redux";

function VehicleForm({ onAdd }) {

    const theme = useSelector((state) => state.theme.mode);

  const [form, setForm] = useState({
    name: "",
    type: "",
    number: "",
    model: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.number || !form.model) return;

    try {
      const docRef = await addDoc(collection(db, "vehicles"), {
        ...form,
        createdAt: Timestamp.now(),
      });
      onAdd({ id: docRef.id, ...form });
      setForm({ name: "", type: "", number: "", model: "" });
    } catch (err) {
      console.error("Error adding vehicle:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 border rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
      <h2 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>Add Vehicle</h2>
      <input
        type="text"
        name="name"
        placeholder="Vehicle Name"
        value={form.name}
        onChange={handleChange}
        className={`border p-2 w-full mb-2 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
      />

      <select name="type" 
      value={form.type}
      onChange={handleChange}
      className={`border p-2 w-full mb-2 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
      >
          <option value="">Type (Car/Bike/etc)</option>
          <option value="car">Car</option>
          <option value="goods">Goods</option>
          <option value="bike">Bike</option>
          <option value="riksha">Riksha</option>
      </select>

      <input
        type="text"
        name="number"
        placeholder="Vehicle Number"
        value={form.number}
        onChange={handleChange}
        className={`border p-2 w-full mb-2 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={form.model}
        onChange={handleChange}
        className={`border p-2 w-full mb-2 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
        Add Vehicle
      </button>
    </form>
  );
}

export default VehicleForm;
