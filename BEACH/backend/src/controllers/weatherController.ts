import { Request, Response } from 'express';
import Weather from '../models/Weather';
import Beach from '../models/Beach';
import { IApiResponse, IWeatherData } from '../types';

// Get weather data for a specific beach
export const getBeachWeather = async (req: Request, res: Response) => {
  try {
    const beachId = req.params.beachId;
    
    // Get the latest weather data for the beach
    const weatherData = await Weather.findOne({ beachId }).sort({ timestamp: -1 });
    
    if (!weatherData) {
      const response: IApiResponse<null> = {
        success: false,
        error: 'Weather data not found for this beach',
      };
      
      return res.status(404).json(response);
    }
    
    const response: IApiResponse<IWeatherData> = {
      success: true,
      data: weatherData,
    };
    
    return res.status(200).json(response);
  } catch (error: any) {
    const response: IApiResponse<null> = {
      success: false,
      error: error.message,
    };
    
    return res.status(500).json(response);
  }
};

// Get weather forecast (5 days) for a specific beach
export const getBeachForecast = async (req: Request, res: Response) => {
  try {
    const beachId = req.params.beachId;
    
    // Check if beach exists
    const beach = await Beach.findById(beachId);
    
    if (!beach) {
      const response: IApiResponse<null> = {
        success: false,
        error: 'Beach not found',
      };
      
      return res.status(404).json(response);
    }
    
    // This would typically call an external weather API
    // For now, we'll return mock forecast data
    const mockForecast = generateMockForecast(beachId);
    
    const response: IApiResponse<any> = {
      success: true,
      data: mockForecast,
    };
    
    return res.status(200).json(response);
  } catch (error: any) {
    const response: IApiResponse<null> = {
      success: false,
      error: error.message,
    };
    
    return res.status(500).json(response);
  }
};

// Update weather data for a beach
export const updateBeachWeather = async (req: Request, res: Response) => {
  try {
    const { beachId } = req.params;
    
    // Check if beach exists
    const beach = await Beach.findById(beachId);
    
    if (!beach) {
      const response: IApiResponse<null> = {
        success: false,
        error: 'Beach not found',
      };
      
      return res.status(404).json(response);
    }
    
    // Create new weather data
    const weatherData = await Weather.create({
      beachId,
      ...req.body,
    });
    
    // Update beach safety level based on wave height
    let safetyLevel = 'safe';
    if (req.body.waveHeight > 2 && req.body.waveHeight < 4) {
      safetyLevel = 'moderate';
    } else if (req.body.waveHeight >= 4) {
      safetyLevel = 'dangerous';
    }
    
    await Beach.findByIdAndUpdate(beachId, {
      safetyLevel,
      waveHeight: req.body.waveHeight,
    });
    
    const response: IApiResponse<IWeatherData> = {
      success: true,
      data: weatherData,
      message: 'Weather data updated successfully',
    };
    
    return res.status(201).json(response);
  } catch (error: any) {
    const response: IApiResponse<null> = {
      success: false,
      error: error.message,
    };
    
    return res.status(400).json(response);
  }
};

// Helper function to generate mock forecast data
const generateMockForecast = (beachId: string) => {
  const forecast = [];
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      temperature: Math.floor(Math.random() * 10) + 20, // 20-30°C
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      waveHeight: Math.random() * 5, // 0-5m
      wavePeriod: Math.floor(Math.random() * 10) + 5, // 5-15s
      beachId,
    });
  }
  
  return forecast;
}; 