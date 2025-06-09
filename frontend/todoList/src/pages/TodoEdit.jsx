import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TodoEdit() {
  // const { id } = useParams();
  const { id } = 'dfdf';
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Simulated fetch (replace with API call)
    const mockTodo = { id, title: `Todo ${id}`, description: 'This is a sample todo.', completed: false };
    setTitle(mockTodo.title);
    setDescription(mockTodo.description);
    setCompleted(mockTodo.completed);
  }, [id]);

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated edit todo (replace with API call)
    console.log('Editing todo:', { id, title, description, completed });
    navigate('/todos');
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
          Edit Todo
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4">
            <label className={`block ${textColor} mb-2`} htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border rounded px-3 py-2 bg-white/10 ${textColor} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="Enter todo title"
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block ${textColor} mb-2`} htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full border rounded px-3 py-2 bg-white/10 ${textColor} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="Enter todo description"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className={`block ${textColor} mb-2`} htmlFor="completed">Completed</label>
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-5 w-5 text-pink-500 focus:ring-pink-500"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-all"
            >
              Save Changes
            </button>
            <NavLink
              to="/todos"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
            >
              Cancel
            </NavLink>
          </div>
        </motion.form>
      </div>
    </div>
  );
}