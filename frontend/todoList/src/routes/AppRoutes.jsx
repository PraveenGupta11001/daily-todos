// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import TodoList from '../pages/TodoList';
import { Children } from 'react';
// import TodoDetails from '../pages/TodoDetails';
// import TodoForm from '../pages/TodoForm';
// import TodoEdit from '../pages/TodoEdit';

const PrivateRoute = ({ children}) => {
    return []
}

// PublicRoute available for all users
const PublicRoute = ({ children }) => {
    return []
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/todols' element={<TodoList />} />
        </Routes>
    )
}