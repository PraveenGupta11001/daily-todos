import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setUser } from '../features/authUser';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://daily-todos-g3np.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        dispatch(setUser({ email })); // Update Redux state
        navigate('/todos');
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
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
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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