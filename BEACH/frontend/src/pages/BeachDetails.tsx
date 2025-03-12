import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaWater, 
  FaWind, 
  FaThermometerHalf, 
  FaExclamationTriangle, 
  FaLifeRing,
  FaMapMarkedAlt,
  FaBan,
  FaCalendarAlt
} from 'react-icons/fa';
import { Beach, WeatherData, ForecastData, Alert, SafetyColors, SafetyLevelText } from '../types';
import { beachApi, weatherApi, alertApi } from '../services/api';
import { IconWrapper } from '../components/IconWrapper';

export const BeachDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // State
  const [beach, setBeach] = useState<Beach | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'forecast' | 'alerts'>('overview');

  // Fetch beach details and related data
  useEffect(() => {
    const fetchBeachDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch beach data
        const beachResponse = await beachApi.getBeachById(id);
        if (!beachResponse.success) {
          throw new Error(beachResponse.error || 'Failed to fetch beach details');
        }
        setBeach(beachResponse.data);
        
        // Fetch current weather
        const weatherResponse = await weatherApi.getBeachWeather(id);
        if (weatherResponse.success) {
          setWeather(weatherResponse.data);
        }
        
        // Fetch forecast
        const forecastResponse = await weatherApi.getBeachForecast(id);
        if (forecastResponse.success) {
          setForecast(forecastResponse.data);
        }
        
        // Fetch alerts
        const alertsResponse = await alertApi.getBeachAlerts(id);
        if (alertsResponse.success) {
          setAlerts(alertsResponse.data);
        }
        
        setError(null);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBeachDetails();
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading beach information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !beach) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Error</h2>
          <p className="text-red-600 mb-4">{error || 'Beach not found'}</p>
          <Link to="/map" className="btn btn-primary inline-flex items-center">
            <IconWrapper icon={FaArrowLeft} className="mr-2" />
            Back to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back button */}
      <Link 
        to="/map" 
        className="inline-flex items-center text-ocean-blue hover:underline mb-4"
      >
        <IconWrapper icon={FaArrowLeft} className="mr-1" />
        Back to Map
      </Link>
      
      {/* Beach header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{beach.name}</h1>
          <div className="flex items-center mt-2">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: SafetyColors[beach.safetyLevel] }}
            ></span>
            <span className="font-semibold">
              {SafetyLevelText[beach.safetyLevel]}
            </span>
            
            {beach.lifeguardAvailable && (
              <span className="ml-4 inline-flex items-center text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                <IconWrapper icon={FaLifeRing} className="mr-1" />
                Lifeguard on duty
              </span>
            )}
          </div>
        </div>
        
        {alerts.length > 0 && (
          <div className="mt-4 md:mt-0 bg-danger-red text-white px-4 py-2 rounded-lg flex items-center">
            <IconWrapper icon={FaExclamationTriangle} className="mr-2" />
            <span>{alerts.length} active {alerts.length === 1 ? 'alert' : 'alerts'}</span>
          </div>
        )}
      </div>
      
      {/* Beach images */}
      {beach.images && beach.images.length > 0 && (
        <div className="rounded-lg overflow-hidden shadow-lg mb-8 h-[300px]">
          <img 
            src={beach.images[0]} 
            alt={beach.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Tabs navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-ocean-blue text-ocean-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('forecast')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'forecast'
                ? 'border-ocean-blue text-ocean-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Weather Forecast
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'alerts'
                ? 'border-ocean-blue text-ocean-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } ${alerts.length > 0 ? 'text-danger-red font-bold' : ''}`}
          >
            Alerts {alerts.length > 0 && `(${alerts.length})`}
          </button>
        </nav>
      </div>
      
      {/* Tab contents */}
      <div className="mb-8">
        {/* Overview tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Description */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-3">About this Beach</h2>
                <p className="text-gray-700 mb-6">{beach.description}</p>
                
                {/* Features */}
                {beach.features && beach.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {beach.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Restrictions */}
                {beach.restrictions && beach.restrictions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Restrictions</h3>
                    <ul className="space-y-1">
                      {beach.restrictions.map((restriction, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <IconWrapper icon={FaBan} className="text-danger-red mr-2 mt-1 flex-shrink-0" />
                          {restriction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Current weather */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
                
                {weather ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <IconWrapper icon={FaThermometerHalf} className="text-red-500 mr-3 text-xl" />
                      <div>
                        <div className="text-sm text-gray-500">Temperature</div>
                        <div className="font-semibold">{weather.temperature}°C</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <IconWrapper icon={FaWind} className="text-gray-500 mr-3 text-xl" />
                      <div>
                        <div className="text-sm text-gray-500">Wind</div>
                        <div className="font-semibold">
                          {weather.windSpeed} km/h {weather.windDirection}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <IconWrapper icon={FaWater} className="text-ocean-blue mr-3 text-xl" />
                      <div>
                        <div className="text-sm text-gray-500">Wave Height</div>
                        <div className="font-semibold">{weather.waveHeight} meters</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <IconWrapper icon={FaCalendarAlt} className="text-gray-500 mr-3 text-xl" />
                      <div>
                        <div className="text-sm text-gray-500">Updated</div>
                        <div className="font-semibold">
                          {new Date(weather.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Weather data not available</p>
                )}
                
                {beach.lifeguardAvailable && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-start">
                      <IconWrapper icon={FaLifeRing} className="text-green-600 mr-3 text-xl mt-1" />
                      <div>
                        <div className="font-semibold">Lifeguard Available</div>
                        {beach.lifeguardHours && (
                          <div className="text-sm text-gray-500">{beach.lifeguardHours}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Map location */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="bg-gray-200 rounded-lg overflow-hidden h-[300px] flex items-center justify-center">
                <div className="text-center p-4">
                  <IconWrapper icon={FaMapMarkedAlt} className="text-4xl mx-auto mb-2 text-ocean-blue" />
                  <p className="text-gray-700">
                    Coordinates: {beach.location.coordinates[1]}, {beach.location.coordinates[0]}
                  </p>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${beach.location.coordinates[1]},${beach.location.coordinates[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-2 inline-block"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Forecast tab */}
        {activeTab === 'forecast' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4">5-Day Weather Forecast</h2>
            
            {forecast.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="font-semibold text-gray-800 mb-2">
                      {formatDate(day.date)}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <IconWrapper icon={FaThermometerHalf} className="text-red-500 mr-2" />
                        <span>{day.temperature}°C</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <IconWrapper icon={FaWind} className="text-gray-500 mr-2" />
                        <span>{day.windSpeed} km/h {day.windDirection}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <IconWrapper icon={FaWater} className="text-ocean-blue mr-2" />
                        <span>{day.waveHeight.toFixed(1)} m</span>
                      </div>
                      
                      <div 
                        className="mt-3 pt-2 border-t border-gray-100 text-center font-medium"
                        style={{ 
                          color: day.waveHeight < 2 
                            ? SafetyColors.safe 
                            : day.waveHeight < 4 
                              ? SafetyColors.moderate 
                              : SafetyColors.dangerous 
                        }}
                      >
                        {day.waveHeight < 2 
                          ? 'Safe for swimming' 
                          : day.waveHeight < 4 
                            ? 'Use caution' 
                            : 'Dangerous conditions'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded p-6 text-center">
                <p className="text-gray-500">Forecast data is not available for this beach.</p>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Alerts tab */}
        {activeTab === 'alerts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4">Beach Alerts</h2>
            
            {alerts.length > 0 ? (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div 
                    key={alert._id} 
                    className={`border-l-4 p-4 rounded-r-lg shadow-sm ${
                      alert.severity === 'danger' 
                        ? 'border-danger-red bg-red-50' 
                        : alert.severity === 'warning' 
                          ? 'border-moderate-yellow bg-yellow-50' 
                          : 'border-blue-400 bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <IconWrapper 
                          icon={FaExclamationTriangle} 
                          className={`mr-2 ${
                            alert.severity === 'danger' 
                              ? 'text-danger-red' 
                              : alert.severity === 'warning' 
                                ? 'text-moderate-yellow' 
                                : 'text-blue-500'
                          }`} 
                        />
                        <h3 className="font-semibold">
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1).replace('-', ' ')} Alert
                        </h3>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(alert.startTime).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <p className="mt-2 text-gray-700">{alert.message}</p>
                    
                    {alert.endTime && (
                      <div className="mt-2 text-sm text-gray-500">
                        Expected to end: {new Date(alert.endTime).toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-800">
                  No current alerts for this beach. Conditions are favorable.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}; 