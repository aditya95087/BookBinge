import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- Components ---
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import TrendingBooks from "./components/Trendingbooks";
import Advertisement from "./components/Advertisement";
import Banner from "./components/Banner"; 
import LatestUpdate from "./components/LatestUpdate";
// --- Pages ---
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ProfilePage from "./pages/Profile";
import Books from "./pages/Books";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import PrivacypolicyPage from "./pages/PrivacypolicyPage";
import TermsAndCondition from "./pages/Terms&Condition";
import LatestUpdatesPage from "./components/LatestUpdate";
import AdminPage from "./pages/AdminPage";
import Admin_login from "./pages/Admin_login";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header visible on all pages */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <Banner/>
                  <TrendingBooks/>
                  <Advertisement />
                  <Banner/>
                  <LatestUpdate/>
                </>
              }
            />

            {/* Other Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/books" element={<Books />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/help" element={<HelpCenterPage/>} />
            <Route path="/privacy" element={<PrivacypolicyPage/>} />
            <Route path="/terms" element={<TermsAndCondition />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin_login" element={<Admin_login />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
