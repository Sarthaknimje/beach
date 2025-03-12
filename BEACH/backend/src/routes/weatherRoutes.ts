import { Router } from 'express';
import {
  getBeachWeather,
  getBeachForecast,
  updateBeachWeather,
} from '../controllers/weatherController';

const router = Router();

// GET /api/weather/beach/:beachId - Get current weather for a beach
router.get('/beach/:beachId', getBeachWeather);

// GET /api/weather/forecast/:beachId - Get weather forecast for a beach
router.get('/forecast/:beachId', getBeachForecast);

// POST /api/weather/beach/:beachId - Update weather data for a beach
router.post('/beach/:beachId', updateBeachWeather);

export default router; 