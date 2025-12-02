import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// --- Icon Components ---
const Icon = ({ path }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const UserIcon = () => (
  <Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
);
const BookOpenIcon = () => (
  <Icon path="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
);
const BookmarkIcon = () => (
  <Icon path="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
);
const LibraryIcon = () => (
  <Icon path="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11m16-11v11" />
);
const CogIcon = () => (
  <Icon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
);
const MailIcon = () => (
  <Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
);
const CalendarIcon = () => (
  <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
);

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const primaryColor = "#14b8a6"; // Teal-500

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch user data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const timeoutId = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  }, [navigate]);

  const InfoCard = React.memo(({ icon, title, value }) => (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg hover:border-teal-500 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <span className="text-gray-500 text-sm font-medium">{title}</span>
          <p className="text-gray-800 text-lg font-semibold">
            {value || "Not Provided"}
          </p>
        </div>
      </div>
    </div>
  ));

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">
                My Profile
              </h2>
              <p className="text-gray-500">
                View and manage your personal information.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard icon={<UserIcon />} title="Full Name" value={user?.name} />
              <InfoCard icon={<MailIcon />} title="Email Address" value={user?.email} />
              <div className="md:col-span-2">
                <InfoCard
                  icon={<CalendarIcon />}
                  title="Member Since"
                  value={user?.memberSince || "January 1, 2024"}
                />
              </div>
            </div>
          </motion.div>
        );

      case "reading-history":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">
                Reading History
              </h2>
              <p className="text-gray-500">Books you've recently viewed.</p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-xl text-center shadow-sm">
              <BookOpenIcon />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Reading History
              </h3>
              <p className="text-gray-500">
                When you read books, they’ll appear here.
              </p>
              <button
                className="mt-6 px-6 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
                onClick={() => navigate("/books")}
              >
                Browse Books
              </button>
            </div>
          </motion.div>
        );

      case "saved-books":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">Saved Books</h2>
              <p className="text-gray-500">Books you've bookmarked.</p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-xl text-center shadow-sm">
              <BookmarkIcon />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Saved Books</h3>
              <p className="text-gray-500">You haven’t saved any books yet.</p>
            </div>
          </motion.div>
        );

      case "my-books":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">My Books</h2>
              <p className="text-gray-500">Books you have checked out.</p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-xl text-center shadow-sm">
              <LibraryIcon />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Books Checked Out</h3>
              <p className="text-gray-500">Your checked-out books will appear here.</p>
            </div>
          </motion.div>
        );

      case "settings":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">Settings</h2>
              <p className="text-gray-500">Manage your account preferences.</p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Account Actions
              </h3>
              <button
                onClick={handleLogout}
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-md font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  }, [activeTab, handleLogout, navigate, user]);

  const menuItems = [
    { id: "profile", label: "Profile", icon: <UserIcon /> },
    { id: "reading-history", label: "Reading History", icon: <BookOpenIcon /> },
    { id: "saved-books", label: "Saved Books", icon: <BookmarkIcon /> },
    { id: "my-books", label: "My Books", icon: <LibraryIcon /> },
    { id: "settings", label: "Settings", icon: <CogIcon /> },
  ];

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 text-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed border-gray-300 rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-semibold mt-4">Loading Profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-gray-50 to-teal-50 text-gray-800 flex flex-col md:flex-row">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full md:w-72 bg-white p-6 flex flex-col border-b md:border-b-0 md:border-r border-gray-200 shrink-0"
      >
        <div className="flex flex-col items-center pb-6 border-b border-gray-200">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                user.name || "User"
              )}`}
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full border-4"
              style={{ borderColor: primaryColor }}
            />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          </motion.div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500 text-sm">Library Member</p>
        </div>

        <nav className="grow mt-6 flex flex-col space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 text-gray-700 font-medium ${
                activeTab === item.id
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                  : "hover:bg-teal-50 hover:text-teal-600"
              }`}
              onClick={() => {
                window.scrollTo(0, 0);
                setActiveTab(item.id);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
