import { Router } from 'express';
import {
  getActiveAlerts,
  getBeachAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
} from '../controllers/alertController';

const router = Router();

// GET /api/alerts - Get all active alerts
router.get('/', getActiveAlerts);

// GET /api/alerts/beach/:beachId - Get alerts for a specific beach
router.get('/beach/:beachId', getBeachAlerts);

// POST /api/alerts - Create a new alert
router.post('/', createAlert);

// PUT /api/alerts/:id - Update an alert
router.put('/:id', updateAlert);

// DELETE /api/alerts/:id - Deactivate an alert
router.delete('/:id', deleteAlert);

export default router; 