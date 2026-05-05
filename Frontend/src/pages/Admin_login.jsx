import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ---- Icons ----
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

// ---- Popup Message ----
const PopupMessage = ({ message, type }) => {
  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-lg shadow-xl text-white z-50
        ${isSuccess ? "bg-green-500" : "bg-red-500"}`}
    >
      {message}
    </motion.div>
  );
};

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email] = useState("admin@gmail.com");
  const [password] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => setPopup(p => ({ ...p, show: false })), 2500);
      return () => clearTimeout(timer);
    }
  }, [popup.show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");
      if (data.role !== "admin") throw new Error("Admin access only");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setPopup({
        show: true,
        message: "Welcome Admin 👑",
        type: "success",
      });

      // ✅ ONLY CHANGE: direct navigation to Admin Page
      navigate("/admin");

    } catch (error) {
      setPopup({
        show: true,
        message: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <AnimatePresence>
        {popup.show && <PopupMessage message={popup.message} type={popup.type} />}
      </AnimatePresence>

      <div className="w-full max-w-5xl flex rounded-2xl shadow-2xl overflow-hidden">
        {/* LEFT PANEL */}
        <motion.div
          className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-teal-500 to-blue-600 text-white p-12"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4">BookBinge</h1>
          <p className="text-lg text-blue-100 text-center">
            Admin Control Panel<br />Manage books, users & orders
          </p>
        </motion.div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/2 bg-white p-10">
          <motion.form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold mb-8">Admin Login</h2>

            <input
              type="email"
              value={email}
              readOnly
              className="w-full mb-4 px-4 py-3 border rounded bg-gray-100"
            />

            <input
              type="password"
              value={password}
              readOnly
              className="w-full mb-6 px-4 py-3 border rounded bg-gray-100"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-500 text-white rounded"
            >
              {loading ? "Signing In..." : "Login as Admin"}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
