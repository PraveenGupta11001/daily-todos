import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { todoWebsiteFAQs } from '../data/todoFAQs';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [expanded, setExpanded] = useState('');

  // Text color: black for light theme, white for dark, blue, green, red themes
  const footerTextColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-black' : 'text-white';
  // Heading color: pink for light theme, white for dark themes for better contrast
  const headingColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-pink-500' : 'text-white';
  // Copyright text: lighter for light theme, subtle for dark themes
  const copyrightTextColor = currentTheme.backgroundColor === 'bg-gray-200' ? 'text-gray-500' : 'text-gray-300';

  const toggleAnswer = (answer) => {
    setExpanded(prev => (prev === answer ? '' : answer));
  };

  return (
    <footer className={`${currentTheme.backgroundColor} ${footerTextColor} bg-opacity-90 backdrop-blur-sm mt-12 shadow-md`}>
      <div className="max-w-8xl mx-auto px-4 py-6">
        {/* FAQs Section */}
        <div className="w-full lg:w-[70%] m-2 md:text-md flex flex-col" id="faq">
          <h1 className={`ml-4 pt-4 mb-2 text-xl lg:text-2xl ${headingColor} font-bold`}>
            Frequently Asked Questions
          </h1>
          {todoWebsiteFAQs.map((faq, index) => {
            const isOpen = expanded === faq.answer;
            return (
              <div className="mx-8" key={index}>
                <div
                  className={`pt-2 grid grid-cols-[95%_1fr] md:grid-cols-[90vw_10vw] lg:grid-cols-[80vw_1fr] ${footerTextColor} font-semibold cursor-pointer transition-all`}
                  onClick={() => toggleAnswer(faq.answer)}
                >
                  <h3>
                    Q{index + 1}. {faq.question}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className={footerTextColor} />
                  ) : (
                    <ChevronDown className={footerTextColor} />
                  )}
                </div>
                {isOpen && (
                  <div className="pb-2 md:text-md flex justify-between border border-transparent border-b-gray-400">
                    <p className={`m-2 ${currentTheme.secondaryColor}`}>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          {/* Logo & Brand */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <motion.h2
              className={`text-xl font-semibold ${headingColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Todos
            </motion.h2>
            <p className={`text-sm ${currentTheme.secondaryColor} mt-1`}>Manage your tasks with ease.</p>
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                `${footerTextColor} ${isActive ? currentTheme.accentColor : `hover:${currentTheme.accentColor}`} transition`
              }
            >
              Privacy
            </NavLink>
            <NavLink
              to="/terms"
              className={({ isActive }) =>
                `${footerTextColor} ${isActive ? currentTheme.accentColor : `hover:${currentTheme.accentColor}`} transition`
              }
            >
              Terms
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${footerTextColor} ${isActive ? currentTheme.accentColor : `hover:${currentTheme.accentColor}`} transition`
              }
            >
              Contact
            </NavLink>
            <a
              href="https://github.com/PraveenGupta11001"
              target="_blank"
              rel="noopener noreferrer"
              className={`${footerTextColor} hover:${currentTheme.accentColor} transition`}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className={`text-center py-4 text-xs ${copyrightTextColor} border-t border-gray-600`}>
        © {new Date().getFullYear()} Todos. All rights reserved.
      </div>
    </footer>
  );
}