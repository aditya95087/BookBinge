import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- ICONS ---------------- */

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

/* ---------------- POPUP ---------------- */

const PopupMessage = ({ message, type }) => {
  const isSuccess = type === "success";
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed top-5 left-1/2 -translate-x-1/2 flex items-center px-4 py-3 rounded-lg shadow-xl text-white z-50
        ${isSuccess ? "bg-green-500" : "bg-red-500"}`}
    >
      <span className="mr-2">{isSuccess ? "✅" : "❌"}</span>
      <span className="font-semibold">{message}</span>
    </motion.div>
  );
};

/* ---------------- REGISTER PAGE ---------------- */

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "",
  });

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Auto hide popup */
  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(
        () => setPopup((p) => ({ ...p, show: false })),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [popup.show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* --------- FIXED REGISTER LOGIC --------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setPopup({
        show: true,
        message: "Please fill in all fields.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setPopup({
        show: true,
        message: "Registration successful! Redirecting...",
        type: "success",
      });

      setTimeout(() => navigate("/login"), 2000);

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
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <AnimatePresence>
        {popup.show && (
          <PopupMessage message={popup.message} type={popup.type} />
        )}
      </AnimatePresence>

      <div className="w-full max-w-5xl flex rounded-2xl shadow-2xl overflow-hidden">
        {/* LEFT PANEL */}
        <motion.div
          className="hidden lg:flex w-1/2 bg-gradient-to-br from-teal-400 to-blue-500 text-white p-12 flex-col items-center justify-center"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-3">BookBinge</h1>
          <p className="text-blue-100">"Open pages, open minds."</p>
        </motion.div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/2 bg-white p-10">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-sm text-gray-500 mb-8">
              Join our community of readers
            </p>

            <div className="relative mb-4">
              <UserIcon />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 py-3 border rounded-lg"
              />
            </div>

            <div className="relative mb-4">
              <EmailIcon />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 py-3 border rounded-lg"
              />
            </div>

            <div className="relative mb-6">
              <LockIcon />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 py-3 border rounded-lg"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold
                ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>

            <p className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 font-semibold">
                Sign In
              </a>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
