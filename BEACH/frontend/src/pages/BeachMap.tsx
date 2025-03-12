import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from 'react-map-gl/maplibre';
import { 
  Marker, 
  Popup, 
  NavigationControl, 
  GeolocateControl,
  MapRef,
  ViewStateChangeEvent,
  ViewState
} from 'react-map-gl/maplibre';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaArrowRight, FaWater, FaFilter, FaTimes } from 'react-icons/fa';
import { Beach, SafetyColors, SafetyLevelText, BeachFilterParams } from '../types';
import { beachApi } from '../services/api';
import { IconWrapper } from '../components/IconWrapper';

export const BeachMap: React.FC = () => {
  // State
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<BeachFilterParams>({});
  
  // Map view state
  const [viewState, setViewState] = useState({
    latitude: 34.0224,      // Los Angeles as default center
    longitude: -118.2851,
    zoom: 9,
    bearing: 0,
    pitch: 0
  });
  
  const navigate = useNavigate();

  // Fetch beaches
  const fetchBeaches = useCallback(async () => {
    try {
      setLoading(true);
      const response = await beachApi.getAllBeaches(filters);
      
      if (response.success) {
        setBeaches(response.data || []);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch beaches');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load beaches on component mount and when filters change
  useEffect(() => {
    fetchBeaches();
  }, [fetchBeaches]);

  // Handle view state change
  const handleViewStateChange = (evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState as any);
  };

  // Toggle filters panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Apply filters
  const applyFilters = (newFilters: BeachFilterParams) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({});
  };

  // Handle selecting a beach marker
  const handleMarkerClick = (beach: Beach) => {
    setSelectedBeach(beach);
  };

  // Close popup
  const closePopup = () => {
    setSelectedBeach(null);
  };

  // Navigate to beach details
  const goToBeachDetails = (beachId: string) => {
    navigate(`/beach/${beachId}`);
  };

  // Render filter panel
  const renderFilterPanel = () => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="absolute top-20 left-4 bg-white p-4 rounded-lg shadow-lg z-10 min-w-[250px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">Filter Beaches</h3>
        <button
          onClick={toggleFilters}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close filters"
        >
          <IconWrapper icon={FaTimes as any} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Safety Level
          </label>
          <div className="space-y-2">
            {(['safe', 'moderate', 'dangerous'] as const).map((level) => (
              <div key={level} className="flex items-center">
                <input
                  type="radio"
                  id={`safety-${level}`}
                  name="safetyLevel"
                  value={level}
                  checked={filters.safetyLevel === level}
                  onChange={() => setFilters({ ...filters, safetyLevel: level })}
                  className="mr-2"
                />
                <label htmlFor={`safety-${level}`} className="flex items-center text-sm text-gray-700">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: SafetyColors[level] }}
                  ></span>
                  {SafetyLevelText[level]}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.lifeguardAvailable === true}
              onChange={() =>
                setFilters({
                  ...filters,
                  lifeguardAvailable: filters.lifeguardAvailable === true ? undefined : true,
                })
              }
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Lifeguard Available</span>
          </label>
        </div>

        <div className="flex justify-between pt-2">
          <button
            onClick={resetFilters}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Reset
          </button>
          <button
            onClick={() => applyFilters(filters)}
            className="btn btn-primary text-sm px-3 py-1"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      {/* Map Container */}
      <Map
        {...viewState}
        onMove={handleViewStateChange}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN || 'YOUR_DEFAULT_MAPBOX_TOKEN'}
      >
        {/* Map Controls */}
        <NavigationControl />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        {/* Beach Markers */}
        {beaches.map((beach) => (
          <Marker
            key={beach._id}
            longitude={beach.location.coordinates[0]}
            latitude={beach.location.coordinates[1]}
            anchor="bottom"
            onClick={(e) => {
              // Prevent the map from being clicked
              e.originalEvent.stopPropagation();
              handleMarkerClick(beach);
            }}
          >
            <div className="relative group">
              <IconWrapper 
                icon={FaMapMarkerAlt as any}
                className="text-2xl cursor-pointer transition-transform group-hover:scale-125"
                style={{ color: SafetyColors[beach.safetyLevel] }}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-white rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {beach.name}
              </div>
            </div>
          </Marker>
        ))}

        {/* Selected Beach Popup */}
        {selectedBeach && (
          <Popup
            longitude={selectedBeach.location.coordinates[0]}
            latitude={selectedBeach.location.coordinates[1]}
            closeOnClick={false}
            onClose={closePopup}
            anchor="bottom"
          >
            <div className="p-2 max-w-[250px]">
              <h3 className="font-bold text-gray-800">{selectedBeach.name}</h3>
              
              <div className="mt-2 flex items-center">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: SafetyColors[selectedBeach.safetyLevel] }}
                ></span>
                <span className="text-sm font-medium">
                  {SafetyLevelText[selectedBeach.safetyLevel]}
                </span>
              </div>
              
              {selectedBeach.waveHeight && (
                <div className="mt-1 flex items-center text-sm text-gray-600">
                  <IconWrapper icon={FaWater as any} className="mr-1" />
                  <span>Wave height: {selectedBeach.waveHeight}m</span>
                </div>
              )}
              
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {selectedBeach.description}
              </p>
              
              <button
                onClick={() => goToBeachDetails(selectedBeach._id)}
                className="mt-3 w-full btn btn-primary text-sm py-1 flex items-center justify-center"
              >
                View Details
                <IconWrapper icon={FaArrowRight as any} className="ml-1" />
              </button>
            </div>
          </Popup>
        )}
      </Map>

      {/* Filter Button */}
      <button
        onClick={toggleFilters}
        className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors"
        aria-label="Filter beaches"
      >
        <IconWrapper icon={FaFilter as any} className="text-gray-700" />
      </button>

      {/* Filter Panel */}
      {showFilters && renderFilterPanel()}

      {/* Map Legend */}
      <div className="absolute bottom-8 left-4 bg-white p-3 rounded-lg shadow-lg z-10">
        <h4 className="font-semibold text-sm mb-2">Beach Safety</h4>
        {Object.entries(SafetyLevelText).map(([level, text]) => (
          <div key={level} className="flex items-center mb-1 last:mb-0">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: SafetyColors[level as keyof typeof SafetyColors] }}
            ></span>
            <span className="text-xs text-gray-700">{text}</span>
          </div>
        ))}
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-20">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ocean-blue"></div>
            <span>Loading beaches...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute bottom-8 right-4 bg-danger-red text-white p-4 rounded-lg shadow-lg z-20 max-w-sm">
          <h4 className="font-bold mb-1">Error</h4>
          <p>{error}</p>
          <button
            onClick={fetchBeaches}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}; 