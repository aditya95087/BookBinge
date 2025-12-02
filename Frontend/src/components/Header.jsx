import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- Icon Component used by the Header ---
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-teal-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const ResponsiveHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(storedUser); // handle if stored as string
      }
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // ✅ Login-based Books button logic
  const handleBooksClick = () => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedUser) {
      navigate("/books");
    } else {
      navigate("/register");
    }
  };

  return (
    <header className="bg-parchment/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <BookIcon />
          <Link className="font-serif text-3xl font-bold text-charcoal" to="/">
            BookBinge
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8 font-medium text-charcoal">
          <Link to="/" className="hover:text-teal-500 transition-colors">
            Home
          </Link>

          {/* ✅ Books Button with Login Condition */}
          <button
            onClick={handleBooksClick}
            className="hover:text-teal-500 transition-colors"
          >
            Books
          </button>

          <Link to="/about" className="hover:text-teal-500 transition-colors">
            About
          </Link>
          <Link to="/help" className="hover:text-teal-500 transition-colors">
            Help center
          </Link>
          <Link to="/contact" className="hover:text-teal-500 transition-colors">
            Contact
          </Link>
        </div>

        {/* Get Started / Username Button */}
        <div className="hidden lg:block">
          {user ? (
            <button
              onClick={() => navigate("/profile")}
              className="bg-chocolate text-black font-bold py-2 px-6 rounded-full hover:bg-teal-500 transition-colors duration-300"
            >
              👤 {user.name || "Profile"}
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-chocolate text-black font-bold py-2 px-6 rounded-full hover:bg-teal-500 transition-colors duration-300"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-charcoal text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4 flex flex-col space-y-3 font-medium text-charcoal bg-parchment/95 backdrop-blur-md">
          <Link
            to="/"
            className="hover:text-teal-500 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {/* ✅ Books Button (Mobile) */}
          <button
            onClick={() => {
              handleBooksClick();
              setMenuOpen(false);
            }}
            className="hover:text-teal-500 transition-colors text-left"
          >
            Books
          </button>

          <Link
            to="/about"
            className="hover:text-teal-500 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/help"
            className="hover:text-teal-500 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Help
          </Link>
          <Link
            to="/contact"
            className="hover:text-teal-500 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {/* Mobile Get Started / Username */}
          {user ? (
            <button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="bg-chocolate text-black font-bold py-2 px-6 rounded-full hover:bg-teal-500 transition-colors duration-300 w-max"
            >
              👤 {user.name || "Profile"}
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-chocolate text-black font-bold py-2 px-6 rounded-full hover:bg-teal-500 transition-colors duration-300 w-max"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default ResponsiveHeader;
