// src/pages/auth/Login.jsx
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <form className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-5" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {err && <p className="text-red-500 font-semibold text-sm">{err}</p>}

        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors">
          Login
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-emerald-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
