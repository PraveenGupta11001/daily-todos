import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TodoDetails() {
  const { id } = '2343';
//   const { id } = useParams();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    // Simulated fetch (replace with actual API call)
    const mockTodo = { id, title: `Todo ${id}`, description: 'This is a sample todo.', completed: false, createdAt: '2025-06-09' };
    setTodo(mockTodo);
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
        <p className={`text-lg ${currentTheme.secondaryColor}`}>Loading...</p>
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

        <motion.div
          className="max-w-2xl mx-auto bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className={`text-xl font-semibold ${headingColor} mb-2`}>{todo.title}</h3>
          <p className={`${currentTheme.secondaryColor} mb-2`}><strong>Description:</strong> {todo.description}</p>
          <p className={`${currentTheme.secondaryColor} mb-2`}><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>
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