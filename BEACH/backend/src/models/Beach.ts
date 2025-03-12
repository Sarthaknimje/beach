import mongoose, { Schema } from 'mongoose';
import { IBeach } from '../types';

const beachSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Beach name is required'],
      unique: true,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: [true, 'Coordinates are required'],
        validate: {
          validator: (val: number[]) => val.length === 2,
          message: 'Coordinates must be [longitude, latitude]',
        },
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    safetyLevel: {
      type: String,
      enum: ['safe', 'moderate', 'dangerous'],
      default: 'moderate',
    },
    features: {
      type: [String],
      default: [],
    },
    restrictions: {
      type: [String],
      default: [],
    },
    lifeguardAvailable: {
      type: Boolean,
      default: false,
    },
    lifeguardHours: {
      type: String,
    },
    images: {
      type: [String],
      default: [],
    },
    waveHeight: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create 2dsphere index for geospatial queries
beachSchema.index({ location: '2dsphere' });

const Beach = mongoose.model<IBeach>('Beach', beachSchema);

export default Beach; 