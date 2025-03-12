import axios from 'axios';

// API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Beach API endpoints
export const beachApi = {
  // Get all beaches
  getAllBeaches: async (params?: any) => {
    const response = await api.get('/beaches', { params });
    return response.data;
  },
  
  // Get beaches near location
  getBeachesNearLocation: async (longitude: number, latitude: number, distance?: number) => {
    const response = await api.get('/beaches/near', {
      params: { longitude, latitude, distance },
    });
    return response.data;
  },
  
  // Get beach by ID
  getBeachById: async (id: string) => {
    const response = await api.get(`/beaches/${id}`);
    return response.data;
  },
  
  // Create a new beach
  createBeach: async (beachData: any) => {
    const response = await api.post('/beaches', beachData);
    return response.data;
  },
  
  // Update a beach
  updateBeach: async (id: string, beachData: any) => {
    const response = await api.put(`/beaches/${id}`, beachData);
    return response.data;
  },
  
  // Delete a beach
  deleteBeach: async (id: string) => {
    const response = await api.delete(`/beaches/${id}`);
    return response.data;
  },
};

// Weather API endpoints
export const weatherApi = {
  // Get current weather for a beach
  getBeachWeather: async (beachId: string) => {
    const response = await api.get(`/weather/beach/${beachId}`);
    return response.data;
  },
  
  // Get weather forecast for a beach
  getBeachForecast: async (beachId: string) => {
    const response = await api.get(`/weather/forecast/${beachId}`);
    return response.data;
  },
  
  // Update weather data for a beach
  updateBeachWeather: async (beachId: string, weatherData: any) => {
    const response = await api.post(`/weather/beach/${beachId}`, weatherData);
    return response.data;
  },
};

// Alert API endpoints
export const alertApi = {
  // Get all active alerts
  getActiveAlerts: async () => {
    const response = await api.get('/alerts');
    return response.data;
  },
  
  // Get alerts for a specific beach
  getBeachAlerts: async (beachId: string) => {
    const response = await api.get(`/alerts/beach/${beachId}`);
    return response.data;
  },
  
  // Create a new alert
  createAlert: async (alertData: any) => {
    const response = await api.post('/alerts', alertData);
    return response.data;
  },
  
  // Update an alert
  updateAlert: async (id: string, alertData: any) => {
    const response = await api.put(`/alerts/${id}`, alertData);
    return response.data;
  },
  
  // Deactivate an alert
  deactivateAlert: async (id: string) => {
    const response = await api.delete(`/alerts/${id}`);
    return response.data;
  },
};

export default api; 