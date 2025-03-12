import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaExclamationTriangle, FaLifeRing, FaWater, FaArrowRight } from 'react-icons/fa';
import { IconWrapper } from '../components/IconWrapper';

export const Home: React.FC = () => {
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const features = [
    {
      icon: <IconWrapper icon={FaMapMarkedAlt as any} className="text-4xl text-ocean-blue" />,
      title: 'Interactive Beach Map',
      description:
        'Explore beaches with our color-coded map showing safety levels: green for safe conditions, yellow for moderate, and red for danger zones.',
    },
    {
      icon: <IconWrapper icon={FaExclamationTriangle as any} className="text-4xl text-danger-red" />,
      title: 'Real-time Alerts',
      description:
        'Get instant notifications about tsunami warnings, high waves, and other critical beach conditions to keep you safe.',
    },
    {
      icon: <IconWrapper icon={FaLifeRing as any} className="text-4xl text-moderate-yellow" />,
      title: 'Safety Information',
      description:
        'Access comprehensive safety tips, lifeguard availability, and emergency contact information for each beach location.',
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-ocean-blue text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <motion.div
            className="absolute inset-0 z-0"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1440 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,117.3C672,139,768,213,864,218.7C960,224,1056,160,1152,138.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Stay Safe at the <span className="text-beach-sand">Beach</span>
            </h1>
            <p className="text-xl mb-8">
              Real-time beach conditions, safety alerts, and interactive maps to help you enjoy the beach safely
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/map"
                className="btn btn-primary group flex items-center justify-center"
              >
                Explore Beach Map
                <IconWrapper icon={FaArrowRight as any} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/alerts"
                className="btn bg-danger-red hover:bg-red-700 text-white flex items-center justify-center"
              >
                View Active Alerts
                <IconWrapper icon={FaExclamationTriangle as any} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave Animation Divider */}
      <div className="bg-white">
        <svg
          className="w-full"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={{ pathLength: 1, pathOffset: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="#1E3A8A"
            stroke="#1E3A8A"
            strokeWidth="4"
            fillOpacity="1"
          ></motion.path>
        </svg>
      </div>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
            >
              How BeachSafe Helps You
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Our platform provides all the information you need for a safe and enjoyable beach experience
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="card flex flex-col items-center text-center p-6"
              >
                <div className="mb-4 p-3 rounded-full bg-gray-100">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-beach-sand py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto text-center"
          >
            <div className="mb-6 inline-block p-3 rounded-full bg-blue-100">
              <IconWrapper icon={FaWater as any} className="text-4xl text-ocean-blue animate-wave" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Explore Safely?</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Check out our interactive map to find safe beaches and get real-time information about conditions.
            </p>
            <Link
              to="/map"
              className="btn btn-primary inline-flex items-center justify-center px-6 py-3 text-lg"
            >
              View Beach Map
              <IconWrapper icon={FaMapMarkedAlt as any} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 