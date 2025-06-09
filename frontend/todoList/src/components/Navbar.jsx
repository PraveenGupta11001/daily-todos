import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setThemes } from '../features/themes';
import { themeMap } from '../constants/themeMap';
import { Circle, X, SquareMenu, User, ChevronDown, List, Plus, Edit, Trash, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTodosOpen, setIsTodosOpen] = useState(false);
  const navigate = useNavigate();

  // Simulate logged-in state (replace with actual auth logic later)
  const isLoggedIn = false;

  // Text color: black for light theme, white for dark themes
  const textColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  // Dropdown background: white for light theme, dark gray for dark themes
  const dropdownBg = currentTheme.backgroundColor === 'bg-gray-200' ? 'bg-white/90 text-gray-800' : 'bg-gray-800/90 text-white';

  // Theme buttons
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
          theme.backgroundColor.includes('pink') ? 'pink'
          : theme.backgroundColor.includes('gray-800') ? 'black'
          : theme.backgroundColor.includes('green') ? '#22c55e'
          : theme.backgroundColor.includes('blue') ? '#3b82f6'
          : theme.backgroundColor.includes('red') ? '#ef4444'
          : 'gray'
        }
        stroke="none"
      />
    </motion.button>
  ));

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

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.1 } },
  };

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Todos', path: '#', icon: null, hasSubmenu: true },
    { name: 'About', path: '/about', icon: null },
  ];

  // Submenu items for Todos
  const todosSubmenu = [
    { name: 'Todo List', path: '/todos', icon: <List size={16} className="mr-1 inline" /> },
    { name: 'Add Todo', path: '/todos/add', icon: <Plus size={16} className="mr-1 inline" /> },
    { name: 'Edit Todo', path: '/todos/edit', icon: <Edit size={16} className="mr-1 inline" /> },
    { name: 'Delete Todo', path: '/todos/delete', icon: <Trash size={16} className="mr-1 inline" /> },
  ];

  // Auth links
  const authItems = [
    { name: 'Login', path: '/login', icon: <LogIn size={16} className="mr-1 inline" /> },
    { name: 'Signup', path: '/signup', icon: <UserPlus size={16} className="mr-1 inline" /> },
  ];

  return (
    <motion.header
      className={`${currentTheme.backgroundColor} ${textColor} sticky top-0 z-50 bg-opacity-90 backdrop-blur-sm shadow-md`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Theme Buttons */}
        <div className="flex items-center gap-4">
          <motion.h1
            className="text-xl font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
          >
            Todo List
          </motion.h1>
          <div className="flex items-center">{themeButtons}</div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                className="relative group"
                variants={menuItemVariants}
                whileHover={{ x: 5 }}
              >
                {item.hasSubmenu ? (
                  <>
                    <span
                      className="py-1 flex items-center cursor-pointer"
                      onMouseEnter={() => setIsTodosOpen(true)}
                      onMouseLeave={() => setIsTodosOpen(false)}
                    >
                      {item.name}
                      <ChevronDown size={16} className="ml-1 inline" />
                    </span>
                    <AnimatePresence>
                      {isTodosOpen && (
                        <motion.ul
                          className={`${dropdownBg} absolute top-full left-0 mt-2 w-40 rounded-md shadow-lg backdrop-blur-sm z-50`}
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          onMouseEnter={() => setIsTodosOpen(true)}
                          onMouseLeave={() => setIsTodosOpen(false)}
                        >
                          {todosSubmenu.map((subItem) => (
                            <motion.li
                              key={subItem.name}
                              className="px-4 py-2 hover:text-pink-500 transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              <NavLink
                                to={subItem.path}
                                className="flex items-center"
                                onClick={() => setIsTodosOpen(false)}
                              >
                                {subItem.icon}
                                {subItem.name}
                              </NavLink>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className="py-1 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                )}
              </motion.li>
            ))}
          </ul>

          {/* Auth Links and User Icon */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={20} className={`mr-1 ${textColor}`} />
                <span className="text-sm font-medium">User</span>
              </motion.div>
            ) : (
              <ul className="flex gap-4 text-sm font-medium">
                {authItems.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={menuItemVariants}
                    whileHover={{ x: 5, color: currentTheme.accentColor }}
                  >
                    <NavLink
                      to={item.path}
                      className="py-1 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-pink-500/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? (
            <X size={30} className={textColor} />
          ) : (
            <SquareMenu size={30} className={textColor} />
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
              {navItems.map((item) => (
                <motion.li key={item.name} variants={menuItemVariants}>
                  {item.hasSubmenu ? (
                    <>
                      <span className="block py-1">{item.name}</span>
                      <ul className="pl-4 flex flex-col gap-2">
                        {todosSubmenu.map((subItem) => (
                          <motion.li
                            key={subItem.name}
                            variants={menuItemVariants}
                            whileHover={{ x: 5, color: '#ec4899' }}
                          >
                            <NavLink
                              to={subItem.path}
                              className="py-1 flex items-center"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.icon}
                              {subItem.name}
                            </NavLink>
                          </motion.li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className="py-1 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </NavLink>
                  )}
                </motion.li>
              ))}
              {isLoggedIn ? (
                <motion.li
                  variants={menuItemVariants}
                  whileHover={{ x: 5, color: '#ec4899' }}
                >
                  <span className="py-1 flex items-center">
                    <User size={16} className="mr-1 inline" />
                    User
                  </span>
                </motion.li>
              ) : (
                authItems.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={menuItemVariants}
                    whileHover={{ x: 5, color: '#ec4899' }}
                  >
                    <NavLink
                      to={item.path}
                      className="py-1 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </NavLink>
                  </motion.li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}