import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
    </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// --- Custom Popup Message Component ---
const PopupMessage = ({ message, type }) => {
  const isSuccess = type === 'success';

  // Dynamic styling based on message type
  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const icon = isSuccess ? '✅' : '❌';

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed top-5 left-1/2 -translate-x-1/2 flex items-center p-4 rounded-lg shadow-xl text-white z-50 ${bgColor}`}
    >
      <span className="text-xl mr-3">{icon}</span>
      <span className="font-semibold">{message}</span>
    </motion.div>
  );
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });

  // --- THIS IS THE NEW CODE ---
  // This hook ensures the page scrolls to the top every time
  // this component is rendered (mounts).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // The empty array [] means this effect runs only once when the component mounts.
  // -----------------------------

  // Effect to automatically hide the popup after 3 seconds
  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => setPopup({ ...popup, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [popup, setPopup]); // Added setPopup to dependency array for correctness

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setPopup({ show: true, message: 'Please fill in all fields.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPopup({ show: true, message: 'Registration successful! Redirecting...', type: 'success' });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Wait for user to read the message before redirecting

    } catch (error) {
      console.error("Registration error:", error);
      setPopup({ show: true, message: 'Registration failed. Please try again.', type: 'error' });
    } finally {
      // Ensure loading is set to false in case of error or success
      // Note: In the success case, we redirect, so this mainly helps for errors.
      // We'll let the redirect handle the component unmount.
      // But if the redirect fails or we stay on page, we must stop loading.
      if (!popup.show || popup.type === 'error') {
         setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 font-sans p-4">
      {/* Renders the popup component when 'popup.show' is true */}
      <AnimatePresence>
        {popup.show && <PopupMessage message={popup.message} type={popup.type} />}
      </AnimatePresence>

      <div className="w-full max-w-5xl flex flex-row rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Panel */}
        <motion.div 
          className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-teal-400 to-blue-500 text-white p-12"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </motion.div>
          <h1 className="text-4xl font-bold mt-6 text-center leading-tight">BookBinge</h1>
          <p className="text-lg mt-4 text-center text-blue-100">"Open pages, open minds."</p>
        </motion.div>

        {/* Right Panel: Register Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12">
          <motion.form
            onSubmit={handleSubmit}
            className="w-full"
            aria-label="Registration form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-3 text-gray-800">Create Account</h2>
            <p className="text-sm text-gray-500 mb-8">Join our community of readers today!</p>
            
            {/* Full Name Input */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Email Input */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><EmailIcon /></div>
                <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Password Input */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div>
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Register Button */}
            <motion.button
              whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
              className={`w-full py-3 font-semibold rounded-lg text-white transition-all duration-300 shadow-md ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
            
            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-blue-500 hover:underline">Sign In</a>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
