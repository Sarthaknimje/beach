import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaExclamationTriangle, 
  FaFilter, 
  FaTimes, 
  FaLocationArrow, 
  FaCalendarAlt, 
  FaSearch,
  FaInfoCircle
} from 'react-icons/fa';
import { Alert, Beach } from '../types';
import { alertApi, beachApi } from '../services/api';
import { IconWrapper } from '../components/IconWrapper';

export const AlertsPage: React.FC = () => {
  // State
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [beaches, setBeaches] = useState<Record<string, Beach>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filter state
  const [filters, setFilters] = useState({
    type: '' as '' | 'tsunami' | 'high-wave' | 'rip-current' | 'storm' | 'other',
    severity: '' as '' | 'info' | 'warning' | 'danger',
  });

  // Fetch alerts
  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await alertApi.getActiveAlerts();
      
      if (response.success) {
        setAlerts(response.data || []);
        setFilteredAlerts(response.data || []);
        
        // Fetch associated beach data for all affected beaches
        const beachIds = new Set<string>();
        response.data?.forEach((alert: Alert) => {
          alert.affectedBeaches.forEach((id: string) => beachIds.add(id));
        });
        
        const beachesMap: Record<string, Beach> = {};
        
        // Only fetch beaches if we have alerts with affected beaches
        if (beachIds.size > 0) {
          // Convert Set to Array to iterate
          const beachIdsArray = Array.from(beachIds);
          
          for (const beachId of beachIdsArray) {
            try {
              const beachResponse = await beachApi.getBeachById(beachId);
              if (beachResponse.success && beachResponse.data) {
                beachesMap[beachId] = beachResponse.data;
              }
            } catch (err) {
              console.error(`Failed to fetch beach ${beachId}:`, err);
            }
          }
        }
        
        setBeaches(beachesMap);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch alerts');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load alerts on component mount
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // Filter alerts when filters or search term change
  useEffect(() => {
    let result = alerts;
    
    // Apply type filter
    if (filters.type) {
      result = result.filter(alert => alert.type === filters.type);
    }
    
    // Apply severity filter
    if (filters.severity) {
      result = result.filter(alert => alert.severity === filters.severity);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(alert => {
        return (
          alert.message.toLowerCase().includes(term) ||
          alert.type.toLowerCase().includes(term) ||
          // Check if any of the affected beaches match the search term
          alert.affectedBeaches.some(beachId => {
            const beach = beaches[beachId];
            return beach && beach.name.toLowerCase().includes(term);
          })
        );
      });
    }
    
    setFilteredAlerts(result);
  }, [alerts, filters, searchTerm, beaches]);

  // Toggle filters panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: '',
      severity: '',
    });
    setSearchTerm('');
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get severity class
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'danger':
        return 'border-danger-red bg-red-50';
      case 'warning':
        return 'border-moderate-yellow bg-yellow-50';
      default:
        return 'border-blue-400 bg-blue-50';
    }
  };

  // Get severity icon color
  const getSeverityIconColor = (severity: string) => {
    switch (severity) {
      case 'danger':
        return 'text-danger-red';
      case 'warning':
        return 'text-moderate-yellow';
      default:
        return 'text-blue-500';
    }
  };

  // Get alert type display text
  const getAlertTypeDisplayText = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Beach Alerts</h1>
          <p className="text-gray-600 max-w-2xl">
            Current active alerts for beaches in the region. Stay informed about conditions that may affect your beach visit.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex">
          <button
            onClick={toggleFilters}
            className="btn bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center"
          >
            <IconWrapper icon={FaFilter} className="mr-2" />
            Filter
          </button>
          <Link
            to="/map"
            className="btn btn-primary ml-2 flex items-center"
          >
            <IconWrapper icon={FaLocationArrow} className="mr-2" />
            View Map
          </Link>
        </div>
      </div>
      
      {/* Filter bar */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filter Alerts</h2>
            <button
              onClick={toggleFilters}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close filters"
            >
              <IconWrapper icon={FaTimes as any} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search in alerts..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-ocean-blue focus:border-ocean-blue"
                />
                <IconWrapper icon={FaSearch as any} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {/* Alert type filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alert Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue focus:border-ocean-blue"
              >
                <option value="">All Types</option>
                <option value="tsunami">Tsunami</option>
                <option value="high-wave">High Wave</option>
                <option value="rip-current">Rip Current</option>
                <option value="storm">Storm</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Severity filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Severity
              </label>
              <select
                value={filters.severity}
                onChange={(e) => setFilters({ ...filters, severity: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue focus:border-ocean-blue"
              >
                <option value="">All Severities</option>
                <option value="info">Information</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
              </select>
            </div>
          </div>
          
          {/* Filter actions */}
          <div className="flex justify-end mt-6">
            <button
              onClick={resetFilters}
              className="text-gray-600 hover:text-gray-800 mr-4"
            >
              Reset Filters
            </button>
            <button
              onClick={toggleFilters}
              className="btn btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center my-12">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ocean-blue"></div>
            <span className="text-gray-600">Loading alerts...</span>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAlerts}
            className="btn bg-white border border-red-300 text-red-700 hover:bg-red-50"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* No alerts state */}
      {!loading && !error && filteredAlerts.length === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 my-8 text-center">
          <IconWrapper icon={FaInfoCircle as any} className="text-green-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-green-800 mb-2">No Active Alerts</h2>
          <p className="text-green-700 mb-4">
            There are currently no active alerts for any beaches.
            {filters.type || filters.severity || searchTerm ? ' Try adjusting your filters.' : ''}
          </p>
          <Link to="/map" className="btn btn-primary inline-flex items-center">
            <IconWrapper icon={FaLocationArrow as any} className="mr-2" />
            View Beach Map
          </Link>
        </div>
      )}
      
      {/* Alerts list */}
      {!loading && !error && filteredAlerts.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredAlerts.length} {filteredAlerts.length === 1 ? 'Alert' : 'Alerts'} Found
            </h2>
            {(filters.type || filters.severity || searchTerm) && (
              <button
                onClick={resetFilters}
                className="text-sm text-ocean-blue hover:underline flex items-center"
              >
                <IconWrapper icon={FaTimes as any} className="mr-1" />
                Clear Filters
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            {filteredAlerts.map((alert) => (
              <motion.div
                key={alert._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`border-l-4 rounded-r-lg shadow-sm overflow-hidden ${getSeverityClass(alert.severity)}`}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                      <IconWrapper 
                        icon={FaExclamationTriangle as any} 
                        className={`mr-3 text-xl ${getSeverityIconColor(alert.severity)}`} 
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {getAlertTypeDisplayText(alert.type)} Alert
                        </h3>
                        <div className="text-sm text-gray-500">
                          Severity: <span className="font-medium">{alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <IconWrapper icon={FaCalendarAlt as any} className="mr-1" />
                      <span>Issued: {formatDate(alert.startTime)}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{alert.message}</p>
                  
                  {alert.endTime && (
                    <div className="text-sm text-gray-500 mb-4">
                      Expected to end: {formatDate(alert.endTime)}
                    </div>
                  )}
                  
                  {/* Affected beaches */}
                  {alert.affectedBeaches.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Affected Beaches:</h4>
                      <div className="flex flex-wrap gap-2">
                        {alert.affectedBeaches.map((beachId) => {
                          const beach = beaches[beachId];
                          return beach ? (
                            <Link
                              key={beachId}
                              to={`/beach/${beachId}`}
                              className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                              <IconWrapper icon={FaLocationArrow as any} className="mr-1 text-xs text-ocean-blue" />
                              {beach.name}
                            </Link>
                          ) : (
                            <span
                              key={beachId}
                              className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                            >
                              Unknown Beach
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Call to action */}
      <div className="bg-ocean-blue text-white rounded-lg p-6 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Stay Safe at the Beach</h2>
            <p>Check our interactive map for real-time beach conditions and safety information.</p>
          </div>
          <Link
            to="/map"
            className="btn bg-white text-ocean-blue hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            View Beach Map
          </Link>
        </div>
      </div>
    </div>
  );
}; 