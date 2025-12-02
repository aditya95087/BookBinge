import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import myVideo from "../assets/BookBinge.mp4";

const BookBingeAd = () => {
  const controls = useAnimation();
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const handleReadBooks = () => {
    const userData = localStorage.getItem("user") || sessionStorage.getItem("user");
    navigate(userData ? "/books" : "/register");
  };

  return (
    <div className="w-full bg-white font-sans">
      {/* Hero Section */}
      <motion.section
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-col lg:flex-row items-center justify-center gap-6 px-4 lg:px-16 py-8 lg:py-12"
      >
        {/* Left - Video */}
        <motion.div
          variants={itemVariants}
          className="relative w-full lg:w-1/2 flex justify-center items-center"
        >
          <div className="w-full max-w-3xl bg-gray-200 rounded-lg overflow-hidden shadow-xl aspect-video">
            <video
              width="100%"
              height="100%"
              controls
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            >
              <source src={myVideo} type="video/mp4" />
            </video>
          </div>
        </motion.div>

        {/* Right - Text & Button */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-3"
          >
            <span className="text-teal-500">Read and Download</span>{" "}
            <span className="text-gray-800">Your Favourite Book with</span>{" "}
            <span className="text-teal-600">BookBinge. </span>
            <span className='text-gray-800'>It is completely Free ..</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-700 mb-6"
          >
            
          </motion.p>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReadBooks}
            className="bg-teal-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
          >
            Read Books
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default BookBingeAd;
