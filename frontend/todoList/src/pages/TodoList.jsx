import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TodoList() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Simulated fetch (replace with actual API call)
    const mockTodos = [
      { id: 1, title: 'Learn React', completed: false },
      { id: 2, title: 'Build Todo App', completed: true },
      { id: 3, title: 'Deploy Project', completed: false },
    ];
    setTodos(mockTodos);
  }, []);

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  const cardVariants = {
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
          Your Todo List
        </motion.h2>

        {todos.length === 0 ? (
          <motion.p
            className={`text-lg ${currentTheme.secondaryColor} text-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No todos yet. <NavLink to="/todos/add" className="text-pink-500 hover:underline">Add one now!</NavLink>
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-pink-500/50 transition-shadow"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className={`text-lg font-semibold ${headingColor} mb-2`}>
                  {todo.title}
                </h3>
                <p className={`${currentTheme.secondaryColor} mb-4`}>
                  Status: {todo.completed ? 'Completed' : 'Pending'}
                </p>
                <div className="flex gap-3">
                  <NavLink
                    to={`/todos/${todo.id}`}
                    className="text-pink-500 hover:underline"
                  >
                    View
                  </NavLink>
                  <NavLink
                    to={`/todos/edit/${todo.id}`}
                    className="text-pink-500 hover:underline"
                  >
                    Edit
                  </NavLink>
                  <NavLink
                    to={`/todos/delete/${todo.id}`}
                    className="text-pink-500 hover:underline"
                  >
                    Delete
                  </NavLink>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}