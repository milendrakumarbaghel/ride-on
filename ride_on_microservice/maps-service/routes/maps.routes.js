import { Router } from 'express';
import { health, geocode, distance, autocomplete } from '../controllers/maps.controller.js';

const router = Router();

router.get('/health', health);
router.get('/geocode', geocode);
router.get('/distance', distance);
router.get('/autocomplete', autocomplete);

export default router;
