import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigationType } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';
import Loader from '../src/assets/Loader.webp';

import './App.css';

function ScrollAndLoad() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show loader during navigation
    setIsLoading(true);
    window.scrollTo(0, 0); // Scroll to top

    // Simulate a loading delay (e.g., for data fetching or transition)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [location.pathname, navigationType]); // Trigger on path or navigation type change

  return (
    <>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={Loader}
            alt="Loading..."
            className="w-75 animate-spin rounded-full"
          />
        </motion.div>
      )}
    </>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPaths: true }}>
        <ScrollAndLoad />
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;