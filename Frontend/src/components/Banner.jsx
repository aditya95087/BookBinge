import React from 'react';
import { motion } from 'framer-motion'; // Make sure to install framer-motion: npm install framer-motion

const FeatureBanner = () => {
  const features = [
    {
      name: 'Read Books Online',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 md:w-10 md:h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a2.25 2.25 0 012.25-2.25h.25a2.25 2.25 0 012.25 2.25m-12-5.25v-7.5m0 7.5v7.5m0-7.5h16.5m-16.5 0h2.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 012.25-2.25h1.25a2.25 2.25 0 012.25 2.25v1.5m0 0h3.5a2.25 2.25 0 012.25 2.25v6.5a2.25 2.25 0 01-2.25 2.25H10.5a2.25 2.25 0 01-2.25-2.25v-7.5M8.25 18.75c-1.243 0-2.25-.972-2.25-2.167v-5.25"
          />
        </svg>
      ),
    },
    {
      name: 'Download Books',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 md:w-10 md:h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3v-2.25M18 9v6.75m0 0a3 3 0 003-3V9a3 3 0 00-3-3h-2.25V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25V9H3a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-6a3 3 0 00-3-3H18z"
          />
        </svg>
      ),
    },
    {
      name: 'Free Service',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 md:w-10 md:h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.01-.195 1.98-.543 2.9C19.613 17.152 16.163 21 12 21c-4.162 0-7.613-3.848-9.457-6.09-.348-.92-.543-1.89-.543-2.9 0-5.523 4.477-10 10-10s10 4.477 10 10z"
          />
        </svg>
      ),
    },
    {
      name: 'Login to continue',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 md:w-10 md:h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.181m5.02-2.153a4.5 4.5 0 011.48-1.48v.001m.002-.002l-.17-.17m1.52-1.52A4.5 4.5 0 0117.25 12h3.75v-.001m0 0l-3.182-3.182A4.505 4.505 0 0112 4.5c-1.867 0-3.674.51-5.24 1.403M2.985 19.644a4.5 4.5 0 01.113-.807c.1-.447.28-.867.51-1.224L7.5 14.25m6.82-2.573c.59-.15.914-.724.086-1.168a7.5 7.5 0 00-6.107 12.724l-.197.387M6 12h1.5l3.086 3.086m-1.558.156L8.5 12h-1.5"
          />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for each feature
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="bg-gray-600 py-4 md:py-6 lg:py-8 text-white" color if needed
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center text-center">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className="flex flex-col items-center justify-center space-y-2 md:space-y-3"
              variants={itemVariants}
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <p className="text-sm md:text-base lg:text-lg font-medium whitespace-nowrap">
                {feature.name}
              </p>
              {index < features.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-white opacity-30"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureBanner;