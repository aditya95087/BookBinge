import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 


  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  // Variant for individual content items to fade in and slide up
  const itemVariants = {
    initial: {
      opacity: 0,
      y: 20, // Start 20px below final position
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-gray-900"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Main content container */}
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        
        {/* Header Section */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-teal-600 mb-4 text-center"
          variants={itemVariants}
        >
          About BookBinge
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-700 mb-12 text-center"
          variants={itemVariants}
          transition={{ delay: 0.2 }} // Slight delay for the subtitle
        >
          Opening a world of knowledge, one page at a time.
          <br />
          For free. For everyone.
        </motion.p>

        {/* --- Content Sections --- */}
        {/* We wrap sections in a parent motion.div to stagger the animation of children */}
        <motion.div
          className="space-y-12"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.2, // Each child animates 0.2s after the previous one
              },
            },
          }}
        >
          {/* Section: What is BookBinge? */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-l-4 border-teal-500 pl-4">
              What is BookBinge?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              BookBinge is a community-driven digital library built on a simple premise: 
              <strong> reading is a fundamental right, not a luxury.</strong> We are a 
              non-profit platform dedicated to providing free and unrestricted access 
              to a vast collection of e-books, articles, and educational materials. 
              Whether you're a student, a lifelong learner, or just looking for your 
              next great read, BookBinge is your open-access bookshelf.
            </p>
          </motion.section>

          {/* Section: Our Purpose & Mission */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-l-4 border-teal-500 pl-4">
              Our Purpose & Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our mission is to <strong>dismantle the financial barriers to knowledge.</strong> We 
              created BookBinge because we believe that curiosity and learning should 
              never be limited by a person's financial situation.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              In a world where library fees, subscription costs, and the high price of
              books can exclude so many, BookBinge stands as a free alternative. 
              <strong> We are here for each and every person who cannot afford to pay for access 
              to information.</strong> Our goal is to empower individuals by providing the 
              resources they need to learn, grow, and explore new worlds, all without
              costing a dime.
            </p>
          </motion.section>

          {/* Highlight Section (Teal Background) */}
          <motion.section 
            className="bg-teal-600 text-white p-8 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold mb-4">Why We're Different</h3>
            <ul className="list-disc list-inside space-y-3 text-lg">
              <li>
                <span className="font-semibold">Absolutely Free, Forever:</span> No 
                subscription fees. No hidden charges. No "premium" content locked 
                behind a paywall.
              </li>
              <li>
                <span className="font-semibold">Access for All:</span> We don't 
                require credit cards or payments. If you have an internet 
                connection, you have a library.
              </li>
              <li>
                <span className="font-semibold">Community-Focused:</span> Built by 
                volunteers and supported by a community that believes in free 
                education and the power of stories.
              </li>
            </ul>
          </motion.section>
        </motion.div>
        
      </div>
    </motion.div>
  );
};

export default AboutPage;