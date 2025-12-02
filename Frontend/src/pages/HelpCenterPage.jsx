import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// You would use an icon library like react-icons in a real project
// import { FaPaperPlane, FaRobot } from 'react-icons/fa';

/**
 * HelpCenterPage Component
 * * Provides answers to common questions and features an AI chatbot placeholder.
 * Uses Framer Motion for animations and Tailwind CSS for styling.
 * Automatically scrolls to the top on component mount.
 */
const HelpCenterPage = () => {

  // This hook ensures the page scrolls to the top on every render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- FAQ Data ---
  // We store the Q&As in an array to easily map over them.
  const faqData = [
    {
      question: "How do I use the website?",
      answer: "Using BookBinge is simple!\n1. **Browse:** Explore our homepage for featured books and popular genres. You can click on any category to see more.\n2. **Search:** Use the search bar at the top of any page to find books by title, author, or keyword.\n3. **Read:** Click on a book cover to see its details. On the details page, click the 'Read Now' button to open the book in our digital reader. All books are completely free to read."
    },
    {
      question: "How do I log in and log out?",
      answer: "**Logging In:**\n1. Click the 'Login' or 'Sign Up' button in the top-right corner of the navigation bar.\n2. If you have an account, enter your email and password. If not, fill out the sign-up form—it's fast and free!\n\n**Logging Out:**\n1. Click on your profile name or icon (which appears in the top-right corner after you log in).\n2. A dropdown menu will appear. Select 'Logout' from the menu."
    },
    {
      question: "How do I check my profile?",
      answer: "Once you are logged in, your profile is your personal hub.\n1. Click on your profile name or icon in the top-right corner.\n2. Select 'My Profile' or 'Dashboard' from the dropdown menu.\n3. Here, you can see your reading history, your list of 'Saved Books', and any account settings you can change, like your password or email address."
    },
    {
      question: "How do I contact you?",
      answer: "We are always here to help!\n1. **Contact Form:** The best way to reach us for detailed inquiries is through our dedicated 'Contact Page'. You'll find a form to fill out, and we'll get back to you as soon as possible.\n2. **Direct Email:** For support, you can email us directly at **support@bookbinge.org**.\n3. **AI Chatbot:** For quick questions, try our AI Helper right here on this page!"
    }
  ];

  // --- Animation Variants ---
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const staggerContainerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2, // Each child animates 0.2s after the previous one
      },
    },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50" // Use a very light gray for a soft background
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-teal-600 mb-2"
            variants={itemVariants}
          >
            Help Center
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700"
            variants={itemVariants}
            transition={{ delay: 0.2 }}
          >
            How can we help you today?
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: FAQs */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={staggerContainerVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-3xl font-semibold text-gray-800 border-b-2 border-teal-500 pb-3">
              Frequently Asked Questions
            </h2>
            
            {faqData.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-semibold text-teal-700 mb-3">
                  {faq.question}
                </h3>
                {/* We use whitespace-pre-line to respect the newlines in the answer strings */}
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: AI Chatbot Placeholder */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              {/* Chatbot Header */}
              <div className="flex items-center space-x-3 border-b-2 border-teal-500 pb-4 mb-4">
                {/* <FaRobot className="text-teal-600 text-3xl" /> */}
                <span className="text-3xl">🤖</span>
                <h3 className="text-2xl font-semibold text-gray-800">
                  BookBinge AI Helper
                </h3>
              </div>

              {/* Chatbot Message Window (Placeholder) */}
              <div className="h-96 flex flex-col space-y-4 overflow-y-auto p-4 bg-gray-50 rounded-md">
                {/* AI Greeting Message */}
                <div className="flex justify-start">
                  <div className="bg-teal-600 text-white p-3 rounded-lg max-w-xs shadow">
                    <p>Hello! I'm the BookBinge AI. Ask me anything about our website, or tell me your mood, and I'll suggest a book!</p>
                  </div>
                </div>
                
                {/* Example User Message */}
                <div className="flex justify-end">
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs shadow">
                    <p>I'm feeling adventurous...</p>
                  </div>
                </div>

                {/* Example AI Response */}
                <div className="flex justify-start">
                  <div className="bg-teal-600 text-white p-3 rounded-lg max-w-xs shadow">
                    <p>Great! How about "Treasure Island" or "The Hobbit"?</p>
                  </div>
                </div>
              </div>

              {/* Chatbot Input Area (Disabled Placeholder) */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2 italic">
                  * AI chatbot integration is coming soon. *
                </p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                  <button
                    disabled
                    className="bg-teal-200 text-white p-3 rounded-md cursor-not-allowed"
                  >
                    {/* <FaPaperPlane className="text-xl" /> */}
                    <span className="text-xl">➤</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
};

export default HelpCenterPage;






