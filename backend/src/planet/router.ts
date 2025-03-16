// src/routes/AstronautRouter.ts
import express from 'express';
import { PlanetController } from './controller';
import { PlanetService } from './service';
import { KnexPlanetRepository } from './knexRepository'

const planetRepository = new KnexPlanetRepository();
const planetService = new PlanetService(planetRepository);
const planetController = new PlanetController(planetService);
const router = express.Router();

router.get('/', planetController.getAll);
router.get('/:id', planetController.getById);
router.post('/', planetController.create);
router.put('/:id', planetController.update);
router.delete('/:id', planetController.delete);

export default router;
