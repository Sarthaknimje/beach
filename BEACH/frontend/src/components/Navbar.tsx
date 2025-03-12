import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWater, FaBars, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { IconWrapper } from './IconWrapper';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Beach Map', path: '/map' },
    { name: 'Safety Tips', path: '/safety' },
    { name: 'Alerts', path: '/alerts' },
  ];

  return (
    <nav className="bg-ocean-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <IconWrapper icon={FaWater as any} className="text-2xl" />
            </motion.div>
            <span className="text-xl font-bold">BeachSafe</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <IconWrapper icon={FaTimes as any} size={24} /> : <IconWrapper icon={FaBars as any} size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-2 hover:text-beach-sand transition-colors ${
                  location.pathname === link.path ? 'font-bold border-b-2 border-beach-sand' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/alerts" 
              className="flex items-center space-x-1 bg-danger-red px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              <IconWrapper icon={FaExclamationTriangle as any} />
              <span>Live Alerts</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-3 pt-2 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-2 px-4 rounded ${
                    location.pathname === link.path ? 'bg-blue-800 font-bold' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/alerts" 
                className="flex items-center space-x-1 bg-danger-red mt-2 px-4 py-2 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <IconWrapper icon={FaExclamationTriangle as any} />
                <span>Live Alerts</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}; 