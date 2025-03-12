// Beach interface
export interface Beach {
  _id: string;
  name: string;
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  description: string;
  safetyLevel: 'safe' | 'moderate' | 'dangerous';
  features: string[];
  restrictions: string[];
  lifeguardAvailable: boolean;
  lifeguardHours?: string;
  images: string[];
  waveHeight?: number;
  updatedAt: string;
  createdAt: string;
}

// Weather data interface
export interface WeatherData {
  _id: string;
  beachId: string;
  temperature: number;
  windSpeed: number;
  windDirection: string;
  waveHeight: number;
  wavePeriod: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

// Forecast data interface
export interface ForecastData {
  date: string;
  temperature: number;
  windSpeed: number;
  windDirection: string;
  waveHeight: number;
  wavePeriod: number;
  beachId: string;
}

// Alert interface
export interface Alert {
  _id: string;
  type: 'tsunami' | 'high-wave' | 'rip-current' | 'storm' | 'other';
  severity: 'info' | 'warning' | 'danger';
  message: string;
  affectedBeaches: string[];
  startTime: string;
  endTime?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Beach filter params
export interface BeachFilterParams {
  safetyLevel?: 'safe' | 'moderate' | 'dangerous';
  lifeguardAvailable?: boolean;
}

// Safety color mapping
export const SafetyColors = {
  safe: '#10B981',       // safe-green
  moderate: '#FBBF24',   // moderate-yellow
  dangerous: '#DC2626',  // danger-red
};

// Safety level text display
export const SafetyLevelText = {
  safe: 'Safe',
  moderate: 'Moderate Risk',
  dangerous: 'Dangerous',
}; 