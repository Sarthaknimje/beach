import mongoose, { Schema } from 'mongoose';
import { IAlert } from '../types';

const alertSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ['tsunami', 'high-wave', 'rip-current', 'storm', 'other'],
      required: [true, 'Alert type is required'],
    },
    severity: {
      type: String,
      enum: ['info', 'warning', 'danger'],
      required: [true, 'Alert severity is required'],
    },
    message: {
      type: String,
      required: [true, 'Alert message is required'],
    },
    affectedBeaches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Beach',
      },
    ],
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define index for querying active alerts
alertSchema.index({ active: 1, startTime: -1 });

const Alert = mongoose.model<IAlert>('Alert', alertSchema);

export default Alert; 