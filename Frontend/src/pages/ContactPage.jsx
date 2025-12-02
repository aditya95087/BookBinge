import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BOOK_HERO_IMAGE = 'https://images.unsplash.com/photo-1655268726747-a72d504f26ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3MlMjB3aGl0ZSUyMGJhZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Framer Motion variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const heroTextVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.7, ease: 'easeOut' } },
  };

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.6, duration: 0.7, ease: 'easeOut' } },
  };

  const inputVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: { scaleX: 1, opacity: 1, transition: { duration: 0.5, originX: 0, ease: 'easeOut' } },
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');


    const formEndpoint = 'https://formspree.io/f/xdkzgzeq';

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Form submission failed:', err);
      setStatus('error');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-teal-100 text-gray-800"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <div
        className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white p-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${BOOK_HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center z-10">
          <motion.h2
            className="text-4xl md:text-6xl font-bold font-serif mb-4"
            variants={heroTextVariants}
          >
            Let’s Connect and Collaborate
          </motion.h2>
          <motion.p
            className="text-2xl md:text-3xl font-light font-mono"
            variants={heroTextVariants}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            with BookBinge...
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start"
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          
          <div>
            <div className="mb-8">
              <h1 className="text-6xl font-bold font-serif mb-4">BookBinge</h1>
              <h3 className="text-3xl md:text-4xl font-medium leading-tight mb-4">
                For Connect, <br /> Collaborate, or inquiries, <br /> please email:
              </h3>
              <a
                href="mailto:hello@bookbinge.org"
                className="text-teal-600 hover:text-teal-800 text-xl md:text-2xl font-bold underline transition duration-300"
              >
                hello@bookbinge.org
              </a>
            </div>
          </div>

        
          <div>
            <h3 className="text-3xl font-semibold mb-8">Contact</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={inputVariants}>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First Name"
                    className="w-full bg-transparent border-b border-gray-400 py-2 focus:border-teal-500 focus:outline-none text-xl transition duration-200 placeholder-gray-500"
                  />
                </motion.div>
                <motion.div variants={inputVariants}>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Last Name"
                    className="w-full bg-transparent border-b border-gray-400 py-2 focus:border-teal-500 focus:outline-none text-xl transition duration-200 placeholder-gray-500"
                  />
                </motion.div>
              </div>

              <motion.div variants={inputVariants}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-gray-400 py-2 focus:border-teal-500 focus:outline-none text-xl transition duration-200 placeholder-gray-500"
                />
              </motion.div>

              <motion.div variants={inputVariants}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  placeholder="Write a message"
                  className="w-full bg-transparent border-b border-gray-400 py-2 focus:border-teal-500 focus:outline-none text-xl transition duration-200 resize-none placeholder-gray-500"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="bg-gray-700 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
                variants={inputVariants}
                style={{ scaleX: 1 }}
              >
                {status === 'sending' ? 'Sending...' : 'Submit'}
              </motion.button>

              {status === 'success' && (
                <p className="text-green-600 mt-4 text-center">
                  ✅ Message sent successfully! We’ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 mt-4 text-center">
                  ❌ Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
