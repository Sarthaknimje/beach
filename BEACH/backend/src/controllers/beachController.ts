import { Request, Response } from 'express';
import Beach from '../models/Beach';
import { IApiResponse, IBeach } from '../types';

// Get all beaches
export const getAllBeaches = async (req: Request, res: Response) => {
  try {
    const { safetyLevel, lifeguardAvailable } = req.query;
    
    let filter: any = {};
    
    if (safetyLevel) {
      filter.safetyLevel = safetyLevel;
    }
    
    if (lifeguardAvailable) {
      filter.lifeguardAvailable = lifeguardAvailable === 'true';
    }
    
    const beaches = await Beach.find(filter);
    
    const response: IApiResponse<IBeach[]> = {
      success: true,
      data: beaches,
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

// Get a single beach by ID
export const getBeachById = async (req: Request, res: Response) => {
  try {
    const beach = await Beach.findById(req.params.id);
    
    if (!beach) {
      const response: IApiResponse<null> = {
        success: false,
        error: 'Beach not found',
      };
      
      return res.status(404).json(response);
    }
    
    const response: IApiResponse<IBeach> = {
      success: true,
      data: beach,
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

// Create a new beach
export const createBeach = async (req: Request, res: Response) => {
  try {
    const beach = await Beach.create(req.body);
    
    const response: IApiResponse<IBeach> = {
      success: true,
      data: beach,
      message: 'Beach created successfully',
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

// Update a beach
export const updateBeach = async (req: Request, res: Response) => {
  try {
    const beach = await Beach.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!beach) {
      const response: IApiResponse<null> = {
        success: false,
        error: 'Beach not found',
      };
      
      return res.status(404).json(response);
    }
    
    const response: IApiResponse<IBeach> = {
      success: true,
      data: beach,
      message: 'Beach updated successfully',
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

// Delete a beach
export const deleteBeach = async (req: Request, res: Response) => {
  try {
    const beach = await Beach.findByIdAndDelete(req.params.id);
    
    if (!beach) {
      const response: IApiResponse<null> = {
        success: false,
        error: 'Beach not found',
      };
      
      return res.status(404).json(response);
    }
    
    const response: IApiResponse<null> = {
      success: true,
      message: 'Beach deleted successfully',
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

// Get beaches near a specific location
export const getBeachesNearLocation = async (req: Request, res: Response) => {
  try {
    const { longitude, latitude, distance = 10000 } = req.query; // distance in meters
    
    if (!longitude || !latitude) {
      const response: IApiResponse<null> = {
        success: false,
        error: 'Longitude and latitude are required',
      };
      
      return res.status(400).json(response);
    }
    
    const beaches = await Beach.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude as string), parseFloat(latitude as string)],
          },
          $maxDistance: parseInt(distance as string),
        },
      },
    });
    
    const response: IApiResponse<IBeach[]> = {
      success: true,
      data: beaches,
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