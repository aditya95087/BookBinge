import React, { useEffect } from "react"; // 1. Import useEffect
import { motion } from "framer-motion";
import BookImage from "../assets/Book-image.png"; // adjust path if needed

const HeroSection = () => {
  // 2. Add the useEffect hook to scroll to the top on component load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures this runs only once

  return (
    <section className="bg-parchment py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Text Section */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-charcoal leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
           <span className="text-teal-500">Where</span> every page is a new journey.
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            BookBinge isn’t just about reading — it’s about exploring worlds, feeling stories, and discovering yourself one page at a time.”
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center lg:justify-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <a
              href="#"
              className="bg-teal text-white font-bold py-3 px-8 rounded-full hover:bg-charcoal transition-transform duration-300 transform hover:scale-105"
            >
              Explore Library
            </a>
          </motion.div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          className="mt-12 lg:mt-0 flex justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <div className="relative max-w-lg w-full rounded-xl p-4 md:p-6 lg:p-8">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-white/10 shadow-[0_0_40px_20px_rgba(0,0,0,0.15)] pointer-events-none"></div>

            <motion.img
              src={BookImage}
              alt="Abstract representation of books"
              className="relative rounded-lg w-full h-auto object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;