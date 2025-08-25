// src/pages/UserManagement/UserManagement.jsx
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../Auth/AuthProvider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

export default function UserManagement() {
  const { user } = useAuth();
  const theme = useSelector((state) => state.theme.mode);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch all users from Firestore
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));

      // Filter based on role: admin sees all, manager sees only drivers
      const filteredUsers =
        user.role === "admin"
          ? userList.filter((u) => u.uid !== user.uid)
          : user.role === "manager"
          ? userList.filter((u) => u.role === "driver")
          : [];

      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const themeCard =
    theme === "dark"
      ? "bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600"
      : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100";

  const themeContainer =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";

  return (
    <div className={`min-h-screen p-6 ${themeContainer}`}>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* User Form */}
      <div className="mb-6 p-4 rounded-lg shadow-md">
        <UserForm onAdd={handleAdd}/>
      </div>

      {/* Users Grid */}
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      {users.length === 0 ? (
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
          No users found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((u) => (
            <div
              key={u.uid}
              className={`border rounded-xl p-4 flex flex-col justify-between shadow-md transition ${themeCard}`}
            >
              <div>
                <p className="font-bold text-lg">{u.email}</p>
                <p className="text-sm capitalize">{u.role}</p>
              </div>
              {u.role === "driver" && (
                <button
                  onClick={() => navigate(`/users/${u.uid}`)}
                  className={`mt-4 px-4 py-2 rounded-lg font-medium transition ${
                    theme === "dark"
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Details
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
