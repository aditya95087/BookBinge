import React, { useState } from "react";
import { motion } from "framer-motion";

const LatestUpdatesPage = () => {
  // BookBinge-themed news items
  const newsItems = [
    {
      id: 1,
      date: "October 30, 2025",
      title: "BookBinge Introduces Personalized Reading Dashboard",
      author: "BookBinge Editorial Team",
      description:
        "BookBinge has unveiled a new personalized reading dashboard designed to help users track their books, ratings, and progress with ease. The update also introduces AI-driven recommendations that match each reader’s unique taste, ensuring a more immersive reading experience...",
      fullText:
        "The dashboard includes visual reading stats, a daily reading streak tracker, and goal-setting features. Users can now sync progress across devices and get AI insights on their reading pace and genre preferences. The feature aims to make reading more habitual and rewarding for all users.",
      imageUrl:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      date: "October 25, 2025",
      title: "BookBinge Launches Global eBook Festival",
      author: "BookBinge Press",
      description:
        "BookBinge celebrates stories worldwide through its new Global eBook Festival, connecting authors and readers from over 20 countries. The event includes workshops, live readings, and Q&A sessions with top writers...",
      fullText:
        "The festival promotes reading diversity and supports indie authors by giving them a global platform. From fantasy to self-help, each genre gets a spotlight. Readers can participate virtually and explore special offers on trending eBooks.",
      imageUrl:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      date: "October 20, 2025",
      title: "BookBinge Mobile App Update: Smarter, Faster, Sleeker",
      author: "BookBinge Tech Team",
      description:
        "The latest BookBinge mobile app update introduces smoother navigation, an offline reading mode, and improved book previews. Users can now experience faster load times and access their favorite titles even without the internet...",
      fullText:
        "This update also improves library organization with better category filters and enhanced visuals. Readers can now customize fonts, backgrounds, and themes for a more comfortable reading journey. The update is live on Android and iOS stores worldwide.",
      imageUrl:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#008080",
      transition: { duration: 0.2 },
    },
  };

  // State for toggling "Read More"
  const [expandedId, setExpandedId] = useState(null);
  const toggleReadMore = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="bg-gradient-to-b from-white to-teal-50 min-h-screen text-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.h2
          className="text-4 xl md:text-6xl text-bold font-serif text-center mb-8 text-teal-600 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          BookBinge News & Updates
          
        </motion.h2>

        {/* News Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {newsItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300"
              variants={itemVariants}
            >
              <motion.img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-56 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-500 text-sm mb-2">
                  📅 {item.date} — ✍️ {item.author}
                </p>
                <h3 className="text-2xl font-serif font-semibold text-teal-800 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  {expandedId === item.id
                    ? `${item.description} ${item.fullText}`
                    : item.description}
                </p>

                <motion.button
                  onClick={() => toggleReadMore(item.id)}
                  className="mt-4 self-start bg-teal-600 text-white px-5 py-2 rounded-md font-medium text-sm shadow hover:bg-teal-700"
                  variants={buttonHoverVariants}
                  whileHover="hover"
                >
                  {expandedId === item.id ? "Read Less ▲" : "Read More ▼"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LatestUpdatesPage;
