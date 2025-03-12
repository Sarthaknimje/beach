import { Router } from 'express';
import {
  getAllBeaches,
  getBeachById,
  createBeach,
  updateBeach,
  deleteBeach,
  getBeachesNearLocation,
} from '../controllers/beachController';

const router = Router();

// GET /api/beaches - Get all beaches
router.get('/', getAllBeaches);

// GET /api/beaches/near - Get beaches near a location
router.get('/near', getBeachesNearLocation);

// GET /api/beaches/:id - Get a specific beach
router.get('/:id', getBeachById);

// POST /api/beaches - Create a new beach
router.post('/', createBeach);

// PUT /api/beaches/:id - Update a beach
router.put('/:id', updateBeach);

// DELETE /api/beaches/:id - Delete a beach
router.delete('/:id', deleteBeach);

export default router; 