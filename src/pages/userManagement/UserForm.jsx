// src/pages/UserManagement/UserForm.jsx
import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function UserForm({ onAdd }) {
  const { user } = useAuth(); // current logged-in user
  const theme = useSelector(state => state.theme.mode)
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  // Determine allowed roles for this user
  const allowedRoles =
    user.role === "admin"
      ? ["manager", "driver"]
      : user.role === "manager"
      ? ["driver"]
      : [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password || !form.role) {
      setError("All fields are required");
      return;
    }

    try {
      // Create user in Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);

      // Save role in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        email: form.email,
        role: form.role,
      });

      // Notify parent to refresh list
      onAdd({ uid: cred.user.uid, email: form.email, role: form.role });

      // Reset form
      setForm({ email: "", password: "", role: "" });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 border rounded-lg ${theme == "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"} bg-gray-100 dark:bg-gray-800`}
    >
      <h2 className="text-xl font-bold mb-2 ">
        Add User
      </h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2 "
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-full mb-2  "
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border p-2 w-full mb-4  "
      >
        <option value="">Select Role</option>
        {allowedRoles.map((r) => (
          <option key={r} value={r} >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Add User
      </button>
    </form>
  );
}
