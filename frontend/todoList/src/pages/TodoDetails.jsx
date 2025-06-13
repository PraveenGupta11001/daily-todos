import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TodoDetails() {
  const { id } = useParams(); // Fixed: Use useParams to get the id dynamically
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          // Map backend completed boolean to status
          const status = data.completed ? 'Completed' : 'Pending';
          setTodo({ ...data, status });
        } else {
          setError(data.detail || 'Failed to fetch todo');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };
    fetchTodo();
  }, [id]);

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  if (!todo) {
    return (
      <div className={`${adjustedBackgroundColor} ${textColor} min-h-screen bg-opacity-90 backdrop-blur-sm flex items-center justify-center`}>
        <p className={`text-lg ${currentTheme.secondaryColor}`}>{error || 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div className={`${adjustedBackgroundColor} ${textColor} min-h-screen bg-opacity-90 backdrop-blur-sm`}>
      <div className="container mx-auto px-4 py-12">
        <motion.h2
          className={`text-3xl md:text-4xl font-bold ${headingColor} text-center mb-8`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Todo Details
        </motion.h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <motion.div
          className="max-w-2xl mx-auto bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className={`text-xl font-semibold ${headingColor} mb-2`}>{todo.title}</h3>
          <p className={`${currentTheme.secondaryColor} mb-2`}><strong>Description:</strong> {todo.description || 'No description'}</p>
          <p className={`${currentTheme.secondaryColor} mb-2`}><strong>Status:</strong> {todo.status}</p>
          <p className={`${currentTheme.secondaryColor} mb-4`}><strong>Created At:</strong> {todo.createdAt}</p>
          <div className="flex gap-4">
            <NavLink
              to={`/todos/edit/${id}`}
              className="inline-block bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-all"
            >
              Edit
            </NavLink>
            <NavLink
              to="/todos"
              className="inline-block bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
            >
              Back to List
            </NavLink>
          </div>
        </motion.div>
      </div>
    </div>
  );
}