import mongoose, { Schema } from 'mongoose';
import { IWeatherData } from '../types';

const weatherSchema: Schema = new Schema(
  {
    beachId: {
      type: Schema.Types.ObjectId,
      ref: 'Beach',
      required: [true, 'Beach ID is required'],
    },
    temperature: {
      type: Number,
      required: [true, 'Temperature is required'],
    },
    windSpeed: {
      type: Number,
      required: [true, 'Wind speed is required'],
    },
    windDirection: {
      type: String,
      required: [true, 'Wind direction is required'],
    },
    waveHeight: {
      type: Number,
      required: [true, 'Wave height is required'],
    },
    wavePeriod: {
      type: Number,
      required: [true, 'Wave period is required'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Weather = mongoose.model<IWeatherData>('Weather', weatherSchema);

export default Weather; 