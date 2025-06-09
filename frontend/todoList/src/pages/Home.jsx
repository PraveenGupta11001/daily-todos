import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  // Override harsh background colors for green, red, blue
  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  // Text color: black for light theme, white for dark themes
  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  // Heading color: pink for light theme, white for dark themes for better contrast
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  // Features data
  const features = [
    {
      title: 'Seamless Task Management',
      description: 'Add, edit, delete, and view your todos with an intuitive interface.',
    },
    {
      title: 'Personalized Themes',
      description: 'Choose from 5 themes (Light, Dark, Blue, Green, Red) to suit your style.',
    },
    {
      title: 'Secure & Free',
      description: 'Enjoy a secure platform with no costs, keeping your data safe.',
    },
    {
      title: 'Mobile-Friendly',
      description: 'Manage tasks on the go with our responsive design.',
    },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className={`${adjustedBackgroundColor} ${textColor} min-h-screen bg-opacity-90 backdrop-blur-sm`}>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.h1
          className={`text-3xl md:text-5xl font-bold ${headingColor} mb-4`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to Todo List
        </motion.h1>
        <motion.p
          className={`text-lg md:text-xl ${currentTheme.secondaryColor} mb-6`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Organize your tasks effortlessly with our secure, customizable, and free app.
        </motion.p>
        <NavLink
          to="/todos"
          className="inline-block bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/50 transition-all"
        >
          Start Managing Tasks
        </NavLink>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className={`text-2xl md:text-3xl font-semibold ${headingColor} text-center mb-8`}>
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-pink-500/50 transition-shadow"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <h3 className={`text-lg font-semibold ${headingColor} mb-2`}>{feature.title}</h3>
              <p className={`${currentTheme.secondaryColor} text-sm`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className={`text-2xl md:text-3xl font-semibold ${headingColor} text-center mb-8`}>
          What Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <p className={`${currentTheme.secondaryColor} text-sm mb-4`}>
              "This app makes task management so simple and fun with its sleek themes!"
            </p>
            <p className={`text-sm font-semibold ${headingColor}`}>- Jane Doe</p>
          </motion.div>
          <motion.div
            className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <p className={`${currentTheme.secondaryColor} text-sm mb-4`}>
              "I love the security and ease of use. It's completely free and works on my phone!"
            </p>
            <p className={`text-sm font-semibold ${headingColor}`}>- John Smith</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}