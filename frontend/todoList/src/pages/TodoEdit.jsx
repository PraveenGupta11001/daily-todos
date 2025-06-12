import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TodoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending'); // Replaced completed with status
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://we-connect-nifx.onrender.com';

  const getErrorMessage = (errorData) => {
    if (typeof errorData === 'string') return errorData;
    if (Array.isArray(errorData)) {
      return errorData.map(err => err.msg).join(', ');
    }
    if (errorData && errorData.msg) return errorData.msg;
    return 'An unknown error occurred.';
  };

  useEffect(() => {
    if (!id) {
      setError('No todo ID provided.');
      navigate('/todos');
      return;
    }
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
          setTitle(data.title);
          setDescription(data.description || '');
          // Map backend completed boolean to status
          setStatus(data.completed ? 'Completed' : 'Pending');
        } else {
          setError(getErrorMessage(data.detail || 'Failed to fetch todo'));
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };
    fetchTodo();
  }, [id, navigate]);

  const adjustedBackgroundColor =
    currentTheme.backgroundColor === 'bg-green-600' ? 'bg-emerald-700' :
    currentTheme.backgroundColor === 'bg-red-600' ? 'bg-rose-700' :
    currentTheme.backgroundColor === 'bg-blue-600' ? 'bg-sky-700' :
    currentTheme.backgroundColor;

  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';

  const handleEnhanceDescription = async () => {
    if (!description.trim()) {
      setError('Please enter a description to enhance.');
      return;
    }

    setIsLoadingSuggestions(true);
    setSuggestions(null);

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_input: `I have written a todo description: "${description}". Please provide the following:
          1. Corrected version with proper spelling and grammar.
          2. An improved version with better phrasing.
          3. A suggested todo title based on the description.
          Format your response as:
          - Corrected: [corrected description]
          - Improved: [improved description]
          - Suggested Title: [suggested title]`,
          max_tokens: 512,
          temperature: 0.7,
          conversation_history: [],
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let responseText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((line) => line.trim());
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.response) {
              responseText += data.response;
            }
          } catch (error) {
            console.error('Error parsing chunk:', error);
          }
        }
      }

      if (responseText) {
        const correctedMatch = responseText.match(/Corrected: (.*?)(?=\n|$)/);
        const improvedMatch = responseText.match(/Improved: (.*?)(?=\n|$)/);
        const titleMatch = responseText.match(/Suggested Title: (.*?)(?=\n|$)/);

        setSuggestions({
          corrected: correctedMatch ? correctedMatch[1] : 'No correction provided.',
          improved: improvedMatch ? improvedMatch[1] : 'No improvement provided.',
          suggestedTitle: titleMatch ? titleMatch[1] : 'No title suggested.',
        });
      } else {
        throw new Error('Empty response from API');
      }
    } catch (error) {
      console.error('Error enhancing description:', error);
      setError('Failed to get suggestions. Please try again.');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleApplySuggestion = (type) => {
    if (type === 'corrected') {
      setDescription(suggestions.corrected);
    } else if (type === 'improved') {
      setDescription(suggestions.improved);
    } else if (type === 'suggestedTitle') {
      setTitle(suggestions.suggestedTitle);
    }
    setSuggestions(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      // Map status to completed boolean for backend compatibility
      const completed = status === 'Completed';
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, completed }),
      });
      if (response.ok) {
        navigate('/todos');
      } else {
        const data = await response.json();
        setError(getErrorMessage(data.detail || 'Failed to update todo'));
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
          Edit Todo
        </motion.h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md relative"
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
          <div className="mb-4 relative">
            <label className={`block ${textColor} mb-2`} htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full border rounded px-3 py-2 bg-white/10 ${textColor} focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10`}
              placeholder="Enter todo description"
              rows="4"
            />
            <button
              type="button"
              onClick={handleEnhanceDescription}
              disabled={isLoadingSuggestions}
              className={`absolute right-2 top-10 p-2 rounded-full transition-all focus:outline-none ${
                isLoadingSuggestions
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
              title="Enhance description with AI"
            >
              {isLoadingSuggestions ? (
                <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            {suggestions && (
              <div className="absolute z-10 bg-white text-black rounded-lg shadow-lg p-4 mt-2 w-full max-w-md max-h-48 overflow-y-auto">
                <p className="font-semibold">Suggestions:</p>
                <p>
                  <span className="font-medium">Corrected:</span> {suggestions.corrected}{' '}
                  <button
                    onClick={() => handleApplySuggestion('corrected')}
                    className="text-indigo-600 hover:underline"
                  >
                    Apply
                  </button>
                </p>
                <p>
                  <span className="font-medium">Improved:</span> {suggestions.improved}{' '}
                  <button
                    onClick={() => handleApplySuggestion('improved')}
                    className="text-indigo-600 hover:underline"
                  >
                    Apply
                  </button>
                </p>
                <p>
                  <span className="font-medium">Suggested Title:</span> {suggestions.suggestedTitle}{' '}
                  <button
                    onClick={() => handleApplySuggestion('suggestedTitle')}
                    className="text-indigo-600 hover:underline"
                  >
                    Apply
                  </button>
                </p>
                <button
                  onClick={() => setSuggestions(null)}
                  className="mt-2 text-red-500 hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className={`block ${textColor} mb-2`} htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full border rounded px-3 py-2 bg-white/10 ${textColor} focus:outline-none focus:ring-2 focus:ring-pink-500`}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Completed">Completed</option>
            </select>
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