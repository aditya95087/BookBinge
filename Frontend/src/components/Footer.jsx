import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SubscribePage = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  // Floating animation for decorative shapes
  const floatVariants = {
    animate: (i) => ({
      y: [0, -12, 0],
      rotate: [0, i % 2 === 0 ? 4 : -4, 0],
      transition: {
        duration: 3 + i * 0.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    }),
  };

  // Fade & slide in animation for text and form
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay },
    }),
  };

  // ✅ Handle Books navigation condition
  const handleBooksClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/books");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-white overflow-hidden">
      {/* --- Main Content --- */}
      <main className="grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative bg-teal-600 rounded-3xl p-10 md:p-14 w-full max-w-4xl shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-center"
        >
          {/* Floating Decor Images */}
          <motion.img
            src="https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?auto=format&fit=crop&q=60&w=900"
            alt="Paper plane"
            className="absolute top-10 right-10 w-24 md:w-32 opacity-80"
            variants={floatVariants}
            initial="animate"
            animate="animate"
            custom={1}
          />
          <motion.img
            src="https://plus.unsplash.com/premium_photo-1678037611062-630433d271b1?auto=format&fit=crop&q=60&w=900"
            alt="Envelope"
            className="absolute -bottom-10 right-0 w-44 md:w-56 opacity-70"
            variants={floatVariants}
            initial="animate"
            animate="animate"
            custom={2}
          />
          <motion.img
            src="https://plus.unsplash.com/premium_photo-1666298864988-c5d7dbaeedfe?auto=format&fit=crop&q=60&w=900"
            alt="Card"
            className="absolute top-20 right-32 w-24 md:w-32 opacity-70"
            variants={floatVariants}
            initial="animate"
            animate="animate"
            custom={3}
          />

          {/* Content */}
          <div className="relative z-10 text-white max-w-lg">
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              Stay in the Loop with BookBinge
            </motion.h2>

            <motion.p
              className="text-base md:text-lg mb-8 text-gray-200"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              Subscribe to <span className="font-semibold text-white">BookBinge</span> to get the latest
              updates, book releases, and exclusive reading tips — straight to your inbox.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="grow p-4 rounded-xl bg-white/15 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-white text-teal-800 font-semibold py-4 px-8 rounded-xl shadow-md hover:bg-gray-200 transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </main>

      {/* --- Footer Section --- */}
      <footer className="bg-[#E1DCC5] border-t border-white/10 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
          <div>
            <h3 className="text-3xl text-teal-700 font-bold text-black">BookBinge</h3>
            <p className="mt-3 text-gray-700">
              The open-source library built for readers.
            </p>
            <p>Scroll less, read more — welcome to BookBinge.</p>
            <p>For readers. By readers. Always BookBinge.</p>
          </div>

          <div>
            <h4 className="text-lg text-teal-700 font-semibold text-black mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              {/* ✅ Books link with login condition */}
              <li>
                <a
                  href="#"
                  onClick={handleBooksClick}
                  className="hover:text-white"
                >
                  Books
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg text-teal-700 font-semibold text-black mb-3">Support</h4>
            <ul className="space-y-2">
              <li><a href="/contact" className="hover:text-white">Contact us</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white">Terms & Condition</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-700 mt-10 border-t border-white/10 pt-6 text-xs">
          © {new Date().getFullYear()} BookBinge | Open Source Library by Readers, for Readers.
        </div>
      </footer>
    </div>
  );
};

export default SubscribePage;
