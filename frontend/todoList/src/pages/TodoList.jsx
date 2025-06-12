import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TodoList() {
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  const getErrorMessage = (errorData) => {
    if (typeof errorData === 'string') return errorData;
    if (Array.isArray(errorData)) {
      return errorData.map(err => err.msg).join(', ');
    }
    if (errorData && errorData.msg) return errorData.msg;
    return 'An unknown error occurred.';
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await fetch('http://localhost:8000/todos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTodos(data);
        } else {
          setError(getErrorMessage(data.detail || 'Failed to fetch todos'));
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };
    fetchTodos();
  }, [navigate]);

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  return (
    <div className={`${adjustedBackgroundColor} ${textColor} min-h-screen bg-opacity-90 backdrop-blur-sm`}>
      <div className="container mx-auto px-4 py-12">
        <motion.h2
          className={`text-3xl md:text-4xl font-bold ${headingColor} text-center mb-8`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Todos
        </motion.h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {todos.length === 0 ? (
            <p className="text-center">No todos found. Create a new one!</p>
          ) : (
            todos.map((todo) => (
              <motion.div
                key={todo.id}
                className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div>
                  <h3 className={`text-lg font-semibold ${textColor}`}>{todo.title}</h3>
                  <p className={`${textColor}`}>{todo.description || 'No description'}</p>
                  <p className={`${textColor}`}>
                    Status: {todo.completed ? 'Completed' : 'Pending'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <NavLink
                    to={`/todos/edit/${todo.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-all"
                  >
                    Edit
                  </NavLink>
                  <NavLink
                    to={`/todos/delete/${todo.id}`}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
                  >
                    Delete
                  </NavLink>
                </div>
              </motion.div>
            ))
          )}
          <NavLink
            to="/todos/add"
            className="block mt-4 text-center bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-all"
          >
            Create New Todo
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
}