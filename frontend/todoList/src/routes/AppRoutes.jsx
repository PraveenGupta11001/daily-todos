import { Routes, Route, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import TodoList from '../pages/TodoList';
import TodoDetails from '../pages/TodoDetails';
import TodoForm from '../pages/TodoForm';
import TodoEdit from '../pages/TodoEdit';
import TodoDelete from '../pages/TodoDelete';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

// Function to check if the user is logged in by verifying the presence of a token
const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if token exists, false otherwise
};

// PrivateRoute: Only accessible to logged-in users
const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

// PublicRoute: Only accessible to non-logged-in users
const PublicRoute = ({ children }) => {
  return !isLoggedIn() ? children : <Navigate to="/todos" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Private Routes */}
      <Route
        path="/todos"
        element={
          <PrivateRoute>
            <TodoList />
          </PrivateRoute>
        }
      />
      <Route
        path="/todos/:id"
        element={
          <PrivateRoute>
            <TodoDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/todos/add"
        element={
          <PrivateRoute>
            <TodoForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/todos/edit/:id"
        element={
          <PrivateRoute>
            <TodoEdit />
          </PrivateRoute>
        }
      />
      <Route
        path="/todos/delete/:id"
        element={
          <PrivateRoute>
            <TodoDelete />
          </PrivateRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}