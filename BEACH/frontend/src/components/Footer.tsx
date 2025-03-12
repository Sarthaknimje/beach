import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaWater, FaHeart } from 'react-icons/fa';
import { IconWrapper } from './IconWrapper';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ocean-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <IconWrapper icon={FaWater as any} className="text-2xl" />
              <span className="text-xl font-bold">BeachSafe</span>
            </Link>
            <p className="mt-2 text-sm text-gray-300 max-w-md">
              Providing real-time beach conditions and safety information to keep beachgoers informed
              and safe. Always check local conditions before swimming.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/map" className="text-gray-300 hover:text-white">Beach Map</Link></li>
                <li><Link to="/safety" className="text-gray-300 hover:text-white">Safety Tips</Link></li>
                <li><Link to="/alerts" className="text-gray-300 hover:text-white">Alerts</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/map" className="text-gray-300 hover:text-white">Weather Data</Link></li>
                <li><Link to="/safety" className="text-gray-300 hover:text-white">Safety Guidelines</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-white">Emergency Contacts</Link></li>
                <li><Link to="/map" className="text-gray-300 hover:text-white">Beach Activities</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Follow Us</h3>
              <div className="flex space-x-4 mt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><IconWrapper icon={FaFacebook as any} size={20} /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><IconWrapper icon={FaTwitter as any} size={20} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><IconWrapper icon={FaInstagram as any} size={20} /></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} BeachSafe. All rights reserved.
          </p>
          <p className="text-sm text-gray-300 mt-2 sm:mt-0 flex items-center">
            Made with <IconWrapper icon={FaHeart as any} className="text-danger-red mx-1" /> for beach lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}; 