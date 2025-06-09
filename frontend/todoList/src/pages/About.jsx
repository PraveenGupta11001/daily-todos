import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function About() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className={`${adjustedBackgroundColor} ${textColor} min-h-screen bg-opacity-90 backdrop-blur-sm`}>
      <div className="container mx-auto px-4 py-12">
        <motion.h2
          className={`text-3xl md:text-4xl font-bold ${headingColor} text-center mb-8`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <p className={`text-lg ${currentTheme.secondaryColor} mb-4`}>
            Welcome to Todo List, your go-to app for managing tasks efficiently. Built with React and Redux, our app offers a seamless experience with customizable themes and a responsive design.
          </p>
          <p className={`text-lg ${currentTheme.secondaryColor} mb-4`}>
            Whether you're organizing your daily chores or managing a project, Todo List helps you stay on top of your tasks with ease. Choose from five themes—Light, Dark, Blue, Green, or Red—to match your style.
          </p>
          <p className={`text-lg ${currentTheme.secondaryColor}`}>
            Our mission is to provide a secure, free, and user-friendly platform for everyone. Join us today and start managing your tasks effortlessly!
          </p>
        </motion.div>
      </div>
    </div>
  );
}