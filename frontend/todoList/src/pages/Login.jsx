import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated login (replace with actual auth logic)
    console.log('Logging in:', { email, password });
  };

  return (
    <div className={`${adjustedBackgroundColor} ${textColor} min-h-screen bg-opacity-90 backdrop-blur-sm flex items-center justify-center`}>
      <motion.div
        className="w-full max-w-md bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`text-3xl font-bold ${headingColor} text-center mb-6`}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block ${textColor} mb-2`} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border rounded px-3 py-2 bg-white/10 ${textColor} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className={`block ${textColor} mb-2`} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded px-3 py-2 bg-white/10 ${textColor} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-all"
          >
            Login
          </button>
        </form>
        <p className={`mt-4 text-center ${currentTheme.secondaryColor}`}>
          Don't have an account?{' '}
          <NavLink to="/signup" className="text-pink-500 hover:underline">
            Sign Up
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
}