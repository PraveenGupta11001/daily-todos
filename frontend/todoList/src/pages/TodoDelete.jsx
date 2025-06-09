import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TodoDelete() {
//   const { id } = useParams();
const { id } = 'fdds';
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    // Simulated fetch (replace with API call)
    const mockTodo = { id, title: `Todo ${id}` };
    setTodo(mockTodo);
  }, [id]);

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  const handleDelete = () => {
    // Simulated delete (replace with API call)
    console.log('Deleting todo:', id);
    navigate('/todos');
  };

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
          Delete Todo
        </motion.h2>

        <motion.div
          className="max-w-md mx-auto bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className={`text-lg ${currentTheme.secondaryColor} mb-4`}>
            Are you sure you want to delete "<strong>{todo.title}</strong>"?
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleDelete}
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-all"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => navigate('/todos')}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}