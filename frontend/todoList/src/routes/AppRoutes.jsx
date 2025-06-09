import { Routes, Route, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import TodoList from '../pages/TodoList';
import TodoDetails from '../pages/TodoDetails';
import TodoForm from '../pages/TodoForm';
import TodoEdit from '../pages/TodoEdit';
import TodoDelete from '../pages/TodoDelete'; // Placeholder for delete page
import Login from '../pages/Login'; // Placeholder for login page
import Signup from '../pages/Signup'; // Placeholder for signup page

// Simulated authentication (replace with actual auth logic later)
const isLoggedIn = false;

// PrivateRoute: Only accessible to logged-in users
const PrivateRoute = ({ children }) => {
//   return isLoggedIn ? children : <Navigate to="/login" />;
  return isLoggedIn ? children : children
};

// PublicRoute: Only accessible to non-logged-in users
const PublicRoute = ({ children }) => {
  return !isLoggedIn ? children : <Navigate to="/todos" />;
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