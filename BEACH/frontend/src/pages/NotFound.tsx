import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaMapMarkedAlt, FaWater } from 'react-icons/fa';
import { IconWrapper } from '../components/IconWrapper';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <IconWrapper icon={FaWater as any} className="text-ocean-blue text-8xl mx-auto animate-wave" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          
          <p className="text-gray-600 mb-8">
            Oops! Looks like you've drifted into uncharted waters. The page you're looking for might have been moved or doesn't exist.
          </p>
          
          <div className="space-y-3">
            <Link 
              to="/" 
              className="btn btn-primary w-full flex items-center justify-center"
            >
              <IconWrapper icon={FaHome as any} className="mr-2" />
              Return to Home
            </Link>
            
            <Link 
              to="/map" 
              className="btn bg-white border border-ocean-blue text-ocean-blue hover:bg-blue-50 w-full flex items-center justify-center"
            >
              <IconWrapper icon={FaMapMarkedAlt as any} className="mr-2" />
              Explore Beach Map
            </Link>
          </div>
          
          <div className="mt-8 text-gray-500 text-sm">
            <p>
              Need help? Visit our <Link to="/safety" className="text-ocean-blue hover:underline">Safety Tips</Link> page
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 