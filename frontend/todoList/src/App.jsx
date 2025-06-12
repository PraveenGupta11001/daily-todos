import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { LoaderPinwheel } from 'lucide-react';
import { motion } from 'framer-motion';

import './App.css';

function ScrollReloadAndLoad() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  useEffect(() => {
    // Show loader and reload on URL change
    const handleRouteChange = () => {
      setIsLoading(true);
      window.scrollTo(0, 0); // Scroll to top
      window.location.reload(); // Reload the page
    };

    handleRouteChange();

    // Since the page reloads, we don't need to hide the loader here
    // The browser reset will handle it
  }, [location.pathname]);

  // Loader color based on theme
  const loaderColor = currentTheme.backgroundColor === 'bg-gray-200' ? '#000000' : '#ffffff';

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
          <LoaderPinwheel
            size={48}
            className="animate-spin"
            style={{ color: loaderColor }}
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
        <ScrollReloadAndLoad />
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;