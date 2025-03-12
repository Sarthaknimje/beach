import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaWater, 
  FaSwimmer, 
  FaSun, 
  FaFirstAid, 
  FaExclamationTriangle, 
  FaChild, 
  FaArrowRight, 
  FaCloudSun,
  FaInfoCircle
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IconWrapper } from '../components/IconWrapper';

// Animation variants
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

export const SafetyTips: React.FC = () => {
  const safetyCategories = [
    {
      id: 'water-safety',
      title: 'Water Safety',
      icon: <IconWrapper icon={FaWater as any} className="text-ocean-blue text-4xl" />,
      tips: [
        'Never swim alone - always use the buddy system',
        'Stay within designated swimming areas and observe all posted signs',
        'Be aware of rip currents - swim parallel to shore if caught in one',
        'Don\'t dive into unknown or shallow waters',
        'Don\'t swim under the influence of alcohol or drugs'
      ]
    },
    {
      id: 'sun-protection',
      title: 'Sun Protection',
      icon: <IconWrapper icon={FaSun as any} className="text-moderate-yellow text-4xl" />,
      tips: [
        'Apply sunscreen with SPF 30+ and reapply every 2 hours',
        'Wear protective clothing, a hat, and sunglasses',
        'Seek shade during peak sun hours (10am-4pm)',
        'Stay hydrated by drinking plenty of water',
        'Be aware of heat exhaustion signs: dizziness, headache, nausea'
      ]
    },
    {
      id: 'beach-hazards',
      title: 'Beach Hazards',
      icon: <IconWrapper icon={FaExclamationTriangle as any} className="text-danger-red text-4xl" />,
      tips: [
        'Watch for warning flags and know what they mean',
        'Be cautious of underwater hazards like rocks or reefs',
        'Avoid swimming during storms or high winds',
        'Be aware of local marine life (jellyfish, sharks, etc.)',
        'Don\'t climb on jetties or breakwaters where waves can sweep you away'
      ]
    },
    {
      id: 'family-safety',
      title: 'Family & Children',
      icon: <IconWrapper icon={FaChild as any} className="text-green-500 text-4xl" />,
      tips: [
        'Always supervise children near water - stay within arm\'s reach',
        'Consider life jackets for young children and weak swimmers',
        'Teach children to ask permission before going near water',
        'Establish a meeting point in case family members get separated',
        'Make sure children understand and follow beach rules'
      ]
    },
    {
      id: 'emergency-readiness',
      title: 'Emergency Readiness',
      icon: <IconWrapper icon={FaFirstAid as any} className="text-red-600 text-4xl" />,
      tips: [
        'Know the location of the nearest lifeguard station',
        'Learn basic CPR and first aid',
        'Keep a charged phone for emergencies',
        'Know how to recognize when someone is drowning (often silent)',
        'Have a basic first aid kit for minor injuries'
      ]
    },
    {
      id: 'weather-awareness',
      title: 'Weather Awareness',
      icon: <IconWrapper icon={FaCloudSun as any} className="text-blue-400 text-4xl" />,
      tips: [
        'Check weather forecasts before going to the beach',
        'Leave the beach immediately if you see lightning or hear thunder',
        'Be aware that weather conditions can change rapidly',
        'Take extra precautions during high tide or storm surges',
        'Pay attention to tsunami warnings in applicable coastal areas'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Beach Safety Tips</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay informed and be prepared with these essential safety guidelines for your beach visits
        </p>
      </div>

      {/* Introduction Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-ocean-blue text-white p-8 rounded-xl shadow-lg mb-12"
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-8">
            <IconWrapper icon={FaInfoCircle as any} className="text-6xl opacity-90" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">Why Beach Safety Matters</h2>
            <p className="text-lg mb-4">
              Beaches offer wonderful recreational opportunities, but they also present unique hazards. Understanding and following safety guidelines can help ensure that your beach experience remains enjoyable and incident-free.
            </p>
            <p className="text-lg">
              Remember to always check local safety conditions using our <Link to="/map" className="underline hover:text-beach-sand transition-colors">interactive map</Link> before heading to the beach.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Safety Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {safetyCategories.map((category, index) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6 bg-gray-50 flex items-center">
              <div className="mr-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {category.tips.map((tip, idx) => (
                  <li key={idx} className="flex">
                    <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✓</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Resources */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a 
            href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/water-safety.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Red Cross Water Safety</h3>
              <p className="text-sm text-gray-600">Comprehensive water safety information and resources</p>
            </div>
            <IconWrapper icon={FaArrowRight as any} className="text-ocean-blue ml-2" />
          </a>
          
          <a 
            href="https://www.weather.gov/safety/ripcurrent" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">NOAA Rip Current Safety</h3>
              <p className="text-sm text-gray-600">Information on how to identify and escape rip currents</p>
            </div>
            <IconWrapper icon={FaArrowRight as any} className="text-ocean-blue ml-2" />
          </a>
          
          <a 
            href="https://www.who.int/news-room/fact-sheets/detail/drowning" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">WHO Drowning Prevention</h3>
              <p className="text-sm text-gray-600">Global information and statistics on drowning prevention</p>
            </div>
            <IconWrapper icon={FaArrowRight as any} className="text-ocean-blue ml-2" />
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Check Beach Conditions?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Use our interactive map to find beaches with safe conditions in your area
        </p>
        <Link 
          to="/map" 
          className="btn btn-primary inline-flex items-center text-lg px-6 py-3"
        >
          <IconWrapper icon={FaSwimmer as any} className="mr-2" />
          Find Safe Beaches
        </Link>
      </div>
    </div>
  );
}; 