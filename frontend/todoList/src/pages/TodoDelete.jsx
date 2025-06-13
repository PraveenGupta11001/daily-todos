import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function TodoDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('No todo ID provided.');
      navigate('/todos');
    }
  }, [id, navigate]);

  const getErrorMessage = (errorData) => {
    if (typeof errorData === 'string') return errorData;
    if (Array.isArray(errorData)) {
      return errorData.map(err => err.msg).join(', ');
    }
    if (errorData && errorData.msg) return errorData.msg;
    return 'An unknown error occurred.';
  };

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(`https://daily-todos-g3np.onrender.com/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        navigate('/todos');
      } else {
        const data = await response.json();
        setError(getErrorMessage(data.detail || 'Failed to delete todo'));
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
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
          Delete Todo
        </motion.h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <motion.div
          className="max-w-md mx-auto bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4">Are you sure you want to delete this todo?</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
            >
              Delete
            </button>
            <NavLink
              to="/todos"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
            >
              Cancel
            </NavLink>
          </div>
        </motion.div>
      </div>
    </div>
  );
}