import { Request, Response } from 'express';
import Alert from '../models/Alert';
import Beach from '../models/Beach';
import { IAlert, IApiResponse } from '../types';

// Get all active alerts
export const getActiveAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await Alert.find({ active: true }).sort({ startTime: -1 });
    
    const response: IApiResponse<IAlert[]> = {
      success: true,
      data: alerts,
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

// Get alerts for a specific beach
export const getBeachAlerts = async (req: Request, res: Response) => {
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
    
    const alerts = await Alert.find({
      affectedBeaches: beachId,
      active: true,
    }).sort({ startTime: -1 });
    
    const response: IApiResponse<IAlert[]> = {
      success: true,
      data: alerts,
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

// Create a new alert
export const createAlert = async (req: Request, res: Response) => {
  try {
    const { affectedBeaches } = req.body;
    
    // Validate that all affected beaches exist
    if (affectedBeaches && affectedBeaches.length > 0) {
      const beachCount = await Beach.countDocuments({
        _id: { $in: affectedBeaches },
      });
      
      if (beachCount !== affectedBeaches.length) {
        const response: IApiResponse<null> = {
          success: false,
          error: 'One or more affected beaches do not exist',
        };
        
        return res.status(400).json(response);
      }
    }
    
    const alert = await Alert.create(req.body);
    
    // Update safety level for all affected beaches to 'dangerous'
    if (affectedBeaches && affectedBeaches.length > 0) {
      await Beach.updateMany(
        { _id: { $in: affectedBeaches } },
        { safetyLevel: 'dangerous' }
      );
    }
    
    const response: IApiResponse<IAlert> = {
      success: true,
      data: alert,
      message: 'Alert created successfully',
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

// Update an alert
export const updateAlert = async (req: Request, res: Response) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!alert) {
      const response: IApiResponse<null> = {
        success: false,
        error: 'Alert not found',
      };
      
      return res.status(404).json(response);
    }
    
    // If the alert is set to inactive, update affected beaches
    if (req.body.active === false) {
      // Reset safety levels for beaches only affected by this alert
      // This is a simplification - in a real system, you'd need to consider other active alerts
      await Beach.updateMany(
        { _id: { $in: alert.affectedBeaches } },
        { safetyLevel: 'safe' }
      );
    }
    
    const response: IApiResponse<IAlert> = {
      success: true,
      data: alert,
      message: 'Alert updated successfully',
    };
    
    return res.status(200).json(response);
  } catch (error: any) {
    const response: IApiResponse<null> = {
      success: false,
      error: error.message,
    };
    
    return res.status(400).json(response);
  }
};

// Delete an alert
export const deleteAlert = async (req: Request, res: Response) => {
  try {
    const alert = await Alert.findById(req.params.id);
    
    if (!alert) {
      const response: IApiResponse<null> = {
        success: false,
        error: 'Alert not found',
      };
      
      return res.status(404).json(response);
    }
    
    // Deactivate the alert instead of deleting it
    alert.active = false;
    await alert.save();
    
    // Reset safety levels for beaches only affected by this alert
    await Beach.updateMany(
      { _id: { $in: alert.affectedBeaches } },
      { safetyLevel: 'safe' }
    );
    
    const response: IApiResponse<null> = {
      success: true,
      message: 'Alert deactivated successfully',
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