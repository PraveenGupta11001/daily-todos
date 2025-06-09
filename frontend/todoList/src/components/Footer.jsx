import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { todoWebsiteFAQs } from '../data/todoFAQs';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [expanded, setExpanded] = useState('');

  const toggleAnswer = (answer) => {
    setExpanded(prev => (prev === answer ? '' : answer));
  };

  return (
    <footer className={`${currentTheme.primaryColor} bg-opacity-90 backdrop-blur-sm mt-12 shadow-md`}>
      <div className="max-w-8xl mx-auto px-4 py-6">
        {/* FAQs Section */}
        <div className="w-full lg:w-[70%] m-2 md:text-md flex flex-col" id="faq">
          <h1 className="ml-4 pt-4 mb-2 text-xl lg:text-2xl text-white font-bold">
            Frequently Asked Questions
          </h1>
          {todoWebsiteFAQs.slice(0, 3).map((faq, index) => {
            const isOpen = expanded === faq.answer;
            return (
              <div className="mx-8" key={index}>
                <div
                  className="pt-2 grid grid-cols-[95%_1fr] md:grid-cols-[90vw_10vw] lg:grid-cols-[80vw_1fr] text-white font-semibold cursor-pointer transition-all"
                  onClick={() => toggleAnswer(faq.answer)}
                >
                  <h3>
                    Q{index + 1}. {faq.question}
                  </h3>
                  {isOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
                </div>
                {isOpen && (
                  <div className="pb-2 md:text-md flex justify-between border border-transparent border-b-white">
                    <p className="m-2 text-white">{faq.answer}</p>
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
              className="text-xl font-semibold text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Todos
            </motion.h2>
            <p className="text-sm text-gray-200 mt-1">Manage your tasks with ease.</p>
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                `text-white ${isActive ? 'text-pink-500' : 'hover:text-pink-500'} transition`
              }
            >
              Privacy
            </NavLink>
            <NavLink
              to="/terms"
              className={({ isActive }) =>
                `text-white ${isActive ? 'text-pink-500' : 'hover:text-pink-500'} transition`
              }
            >
              Terms
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white ${isActive ? 'text-pink-500' : 'hover:text-pink-500'} transition`
              }
            >
              Contact
            </NavLink>
            <a
              href="https://github.com/PraveenGupta11001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-white border-t border-black">
        © {new Date().getFullYear()} Todos. All rights reserved.
      </div>
    </footer>
  );
}