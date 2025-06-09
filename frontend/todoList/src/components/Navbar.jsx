import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setThemes } from '../features/themes';
import { themeMap } from '../constants/themeMap';
import { Circle, X, SquareMenu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme buttons with filled background and subtle glow
  const themeButtons = Object.entries(themeMap).map(([name, theme]) => (
    <motion.button
      key={name}
      onClick={() => dispatch(setThemes(theme))}
      className="mx-1 p-0.5 rounded-full bg-white shadow-sm hover:shadow-lg hover:shadow-pink-500/50 transition-shadow"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Circle
        size={12}
        fill={
          theme.primaryColor.includes('pink') ? 'pink'
          : theme.primaryColor.includes('black') ? 'black'
          : theme.primaryColor.includes('green') ? '#22c55e'
          : theme.primaryColor.includes('blue') ? '#3b82f6'
          : theme.primaryColor.includes('red') ? '#ef4444'
          : 'gray'
        }
        stroke="none"
      />
    </motion.button>
  ));

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200 } },
  };

  return (
    <motion.header
      className={`${currentTheme.primaryColor} sticky top-0 z-50 bg-opacity-90 backdrop-blur-sm shadow-md`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Theme buttons */}
        <div className="flex items-center gap-4">
          <motion.h1
            className="text-xl font-semibold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Todo List
          </motion.h1>
          <div className="flex items-center">{themeButtons}</div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-white">
          {['Home', 'Todos', 'Todols', 'About'].map((item) => (
            <motion.li
              key={item}
              variants={menuItemVariants}
              whileHover={{ x: 5, color: '#ec4899' }}
            >
              <NavLink
                to={
                  item === 'Home' ? '/' :
                  item === 'Todos' ? '/todos' :
                  item === 'Todols' ? '/todols' :
                  '/about'
                }
                className="block py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-pink-500/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? (
            <X size={30} className="text-white" />
          ) : (
            <SquareMenu size={30} className="text-white" />
          )}
        </motion.button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/90 backdrop-blur-sm px-4 py-3 shadow-md"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="flex flex-col gap-3 text-sm font-medium text-gray-800">
              {['Home', 'Todos', 'Todols', 'About'].map((item) => (
                <motion.li
                  key={item}
                  variants={menuItemVariants}
                  whileHover={{ x: 5, color: '#ec4899' }}
                >
                  <NavLink
                    to={
                      item === 'Home' ? '/' :
                      item === 'Todos' ? '/todos' :
                      item === 'Todols' ? '/todols' :
                      '/about'
                    }
                    className="block py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}