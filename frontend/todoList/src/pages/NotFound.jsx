import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  return (
    <div className={`${adjustedBackgroundColor} ${textColor} min-h-screen bg-opacity-90 backdrop-blur-sm flex items-center justify-center`}>
      <motion.div
        className="text-center p-6 rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`text-4xl md:text-5xl font-bold ${headingColor} mb-4`}>
          404 - Page Not Found
        </h2>
        <p className={`text-lg ${currentTheme.secondaryColor} mb-6`}>
          Sorry, the page you're looking for doesn't exist.
        </p>
        <NavLink
          to="/"
          className="inline-block bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/50 transition-all"
        >
          Go to Home
        </NavLink>
      </motion.div>
    </div>
  );
}