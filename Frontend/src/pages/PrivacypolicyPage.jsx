import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  // Scrolls to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Variant for the overall page (simple fade-in)
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
      className="bg-white min-h-screen" // White background, full screen height
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/*
          This motion.div parent is new.
          It controls the 'staggerChildren' animation, making each
          child with 'variants={itemVariants}' animate one after the other.
        */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.15, // Each child animates 0.15s after the previous
              },
            },
          }}
        >
          <motion.h1
            className="text-5xl font-extrabold text-teal-600 text-center mb-6"
            variants={itemVariants}
          >
            Privacy Policy for BookBinge
          </motion.h1>
          <motion.p
            className="text-sm text-gray-500 mb-10"
            variants={itemVariants}
          >
         
          </motion.p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            {/* Each <section> is now a <motion.section> using itemVariants */}

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                1. Introduction
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to BookBinge ("we," "our," or "us"). BookBinge is an
                open-source software library. Our privacy and the privacy of your
                end-users are important to us. This Privacy Policy explains how
                we handle information in relation to our open-source project.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                As an open-source library,{' '}
                <strong>
                  BookBinge itself does not collect, store, or transmit any
                  personal data
                </strong>{' '}
                from the applications that use it. The library's code runs
                entirely on the user's device or the developer's server.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2. Information We Collect (and Don't Collect)
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                What We Don't Collect (From Your App Users)
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be perfectly clear: The BookBinge library, when integrated
                into your application, does not initiate any network requests to
                our servers, does not use trackers, and does not collect any
                Personal Identifiable Information (PII) or usage analytics from
                your end-users.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                What We May Collect (From Developers & Contributors)
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We may interact with developers and contributors through
                platforms like GitHub. The information we may collect in this
                context is limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4 pl-4">
                <li>
                  <strong>GitHub Profile Information:</strong> Your username,
                  email address, and profile details if you open an issue,
                  submit a pull request, or "star" our repository.
                </li>
                <li>
                  <strong>Communication:</strong> Any information you voluntarily
                  provide when you report a bug, request a feature, or
                  communicate with the project maintainers.
                </li>
              </ul>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                3. How We Use Information
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Any information we collect from developers and contributors (as
                described above) is used solely for the purpose of maintaining
                and improving the BookBinge open-source project. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4 pl-4">
                <li>Responding to bug reports and support requests.</li>
                <li>Reviewing and merging pull requests.</li>
                <li>Communicating with contributors about the project.</li>
                <li>Crediting contributions.</li>
              </ul>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We do not sell, trade, or rent any personal information. As this
                is an open-source project, communications on public platforms
                (like GitHub issues and pull requests) are, by their nature,
                public.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                5. Your Responsibility as a Developer
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                If you are a developer using the BookBinge library in your
                application, you are responsible for your own app's privacy
                policy and data practices. While BookBinge does not collect data,
                you must ensure your application is compliant with all
                applicable privacy laws and regulations regarding the data
                *you* collect.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                6. Changes to This Privacy Policy
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last Updated" date. We recommend
                reviewing this policy periodically.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                7. Contact Us
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please feel
                free to open an issue on our GitHub repository.
              </p>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;