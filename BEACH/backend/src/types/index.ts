import { Document } from 'mongoose';

// Beach interface
export interface IBeach extends Document {
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
  currentWeather?: IWeatherData;
  waveHeight?: number;
  updatedAt: Date;
}

// Weather data interface
export interface IWeatherData extends Document {
  beachId: string;
  temperature: number;
  windSpeed: number;
  windDirection: string;
  waveHeight: number;
  wavePeriod: number;
  timestamp: Date;
}

// Alert interface
export interface IAlert extends Document {
  type: 'tsunami' | 'high-wave' | 'rip-current' | 'storm' | 'other';
  severity: 'info' | 'warning' | 'danger';
  message: string;
  affectedBeaches: string[];
  startTime: Date;
  endTime?: Date;
  active: boolean;
}

// Request parameters interface
export interface IBeachParams {
  id?: string;
  name?: string;
  safetyLevel?: 'safe' | 'moderate' | 'dangerous';
  lifeguardAvailable?: boolean;
}

// Response interfaces
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 